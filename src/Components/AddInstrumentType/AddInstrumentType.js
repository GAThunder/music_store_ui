import React, { useState, useEffect } from 'react';
import classes from './AddInstrumentType.module.css';
import axios from 'axios';
import Header from '../Header/Header';


const AddInstrumentType = () => {

    const api = axios.create({
        baseURL: 'https://localhost:44323/',
    })
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [completeItem, setCompleteItem] = useState({
        type: '',
        description: '',
    });

    const nameChangeHandler = (e) => {
        setItemName(e.target.value);
        let updateItemName = completeItem;
        updateItemName.type = e.target.value;
        setCompleteItem(updateItemName);
    }

    const descriptionChangeHandler = (e) => {
        setItemDescription(e.target.value);
        let updateItemDescription = completeItem;
        updateItemDescription.description = e.target.value;
        setCompleteItem(updateItemDescription);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        let errors = false;

        if (itemName.length == 0)
        {
            errors = true;
        }

        if (itemDescription.length == 0)
        {
            errors = true;
        }

        if (errors)
        {
            alert("Please fill out all fields");
        }
        else
        {
            
            api.post('api/ModifyInventory/AddNewInstrumentType', completeItem)
            .then( res => {
                console.log(res);
            });
            console.log(completeItem);
        }

    }

    return (
        <div className={classes.Form}>
            <h1>Add a new instrument type!</h1>
            <form className={classes.InnerForm}>
                <span className={classes.FormItem}><label for="name">Name:</label><input type='text' value={itemName} onChange={nameChangeHandler} /></span>
                <span className={classes.FormItem}><label for="description">Description:</label><textarea type='text' value={itemDescription} onChange={descriptionChangeHandler} className={classes.FormDescription}/></span>
                <input className={classes.FormSubmit} type='submit' onClick={submitHandler} />
            </form>
        </div>
    )
}

export default AddInstrumentType