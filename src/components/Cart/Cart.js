import React, { useContext, useState } from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [isSubmited, setIsSubmited] = useState(false)

    const cartCtx = useContext(CartContext)

    const totalAmount = cartCtx.totalAmount.toFixed(2)
    const hasItems = cartCtx.items.length > 0

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1})
    }

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmiting(true)
        await fetch('https://meki-meals-default-rtdb.firebaseio.com/order.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items 
            })
        })
        setIsSubmiting(false)
        setIsSubmited(true)
        cartCtx.clearCart()
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem 
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    )

    const actions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    )

    const cartModal = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart} />}
            {!isCheckout && actions}
        </React.Fragment>
    )

    const isSubmittingModal = <p>Sending order data...</p>

    const isSubmitedModal = <React.Fragment>
        <p className={classes.ordered}>Order is sent successfully!</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onCloseCart}>Close</button>
        </div>
    </React.Fragment> 


    return (
        <Modal onCloseCart={props.onCloseCart}>
            {!isSubmiting && !isSubmited && cartModal}
            {isSubmiting && isSubmittingModal}
            {!isSubmiting && isSubmited && isSubmitedModal}
        </Modal>
    )
}

export default Cart 