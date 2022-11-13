import { Fragment } from "react"
import MealsImg from '../../assets/klopa.jpg'
import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton"

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>MekiMeals</h1>
                <HeaderCartButton onShowCart={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={MealsImg} alt="Klopaaaaaaaaaa" />
            </div>
        </Fragment>
    )
} 

export default Header