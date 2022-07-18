import React from 'react'
import classes from './Header.module.css';
import Logo from '../../Images/Logo.jpg';
import { NavLink } from 'react-router-dom';

const Header = () => {
    let activeStyle = {
        filter: "brightness(85%)"
    }
    return (
        <div className={classes.Header}>
            <span className={classes.Logo}> <img src={Logo} className={classes.img} /> <p className={classes.p}>Welcome to the Music Store!</p></span>
            <span className={classes.Buttons}>
                <NavLink to="/"
                    style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }><button className={classes.button}>Instruments</button>
                </NavLink>
                <NavLink to="/AddInstrument"
                    style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }><button className={classes.button}>Add Product</button>
                </NavLink>
                <NavLink to="/AddInstrumentType"
                    style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }><button className={classes.button}>Add Instrument Type</button>
                </NavLink>
                <NavLink to="/Contact"
                    style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }><button className={classes.button}>Contact Us</button>
                </NavLink>
            </span>
        </div>
    )
}

export default Header