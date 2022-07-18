import React from 'react'
import classes from './Instrument.module.css';
import {Link} from 'react-router-dom';

const Instrument = (props) => {
  return (
    <div className={classes.MainBlock}>
        <img src={props.url} className={classes.ItemImage} />
        <Link to={`/${props.id}`}><p>{props.name}</p></Link>
        <p className={classes.BlockPrice}>{props.price}</p>
    </div>
  )
}

export default Instrument