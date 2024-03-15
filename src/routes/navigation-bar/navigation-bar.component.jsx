import { Outlet, Link } from "react-router-dom"
import { Fragment } from "react"
import {ReactComponent as CrwnLogo} from '../../asset/logo/crown.svg'

import './navigation-bar.styles.scss'

const NavBar = () => {
    return(
        <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <CrwnLogo className="logo"/>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>
                <Link className="nav-link" to='/sign-in'>
                    SIGN IN
                </Link>
            </div>
        </div>
            <Outlet/>
        </Fragment>
    )
}

export default NavBar;