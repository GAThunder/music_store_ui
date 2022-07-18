import React from 'react'
import classes from './ErrorPage.module.css';

const ErrorPage = () => {
  return (
    <div className={classes.Error}>
        <h1>OOPS!</h1>
        <p>Looks like there was an error!</p>
    </div>
  )
}

export default ErrorPage