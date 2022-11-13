import React, { Fragment } from "react"
import classes from './Modal.module.css'
import ReactDOM from 'react-dom'

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onCloseCart}></div>
}

const Overlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    )
}

const portalElement = document.getElementById('overlays')


const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onCloseCart={props.onCloseCart}/>, portalElement)}
            {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, portalElement)}
        </Fragment>
    )

}

export default Modal 