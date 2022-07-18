import React, { useState, useEffect } from 'react'
import classes from './AddItem.module.css';
import axios from 'axios';




const AddItem = () => {

    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemImage, setItemImage] = useState('');
    const [itemPrice, setItemPrice] = useState(0);
    const [itemQuantity, setItemQuantity] = useState(0);
    const [itemInstrumentID, setItemInstrumentID] = useState(0);
    const [possibleInstrumentType, setPossibleInstrumentType] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [completeItem, setCompleteItem] = useState({
        Name: '',
        Description: '',
        ImageLocation: '',
        Price: 0,
        Quantity: 0,
        InstrumentType_Id: null,
    });

    const api = new axios.create({
        baseURL: 'https://localhost:44323/'
    })

    useEffect(() => {

        api.get('api/ReadInventory/GetInstrumentTypes').then(res => {
            setPossibleInstrumentType(res.data);
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
        });
    }, [])

    let itemOptions = [];
    if (isLoading == false) {
        possibleInstrumentType.map((item, i) => {
            itemOptions.push(<option key={i} id={item.id}>{item.type}</option>);
        })
    }

    let itemsToLoad = isLoading ? <option>Loading</option> : itemOptions

    const nameChangeHandler = (e) => {
        setItemName(e.target.value);
        let updateItemName = completeItem;
        updateItemName.Name = e.target.value;
        setCompleteItem(updateItemName);
    }

    const descriptionChangeHandler = (e) => {
        setItemDescription(e.target.value);
        let updateItemDescription = completeItem;
        updateItemDescription.Description = e.target.value;
        setCompleteItem(updateItemDescription);
    }

    const imageChangeHandler = (e) => {
        setItemImage(e.target.value);
        let updateItemImage = completeItem;
        updateItemImage.ImageLocation = e.target.value;
        setCompleteItem(updateItemImage);
    }

    const priceChangeHandler = (e) => {
        setItemPrice(e.target.value);
        let updateItemPrice = completeItem;
        updateItemPrice.Price = e.target.value;
        setCompleteItem(updateItemPrice);
    }

    const quantityChangeHandler = (e) => {
        setItemQuantity(e.target.value);
        let updateItemQuantity = completeItem;
        updateItemQuantity.Quantity = e.target.value;
        setCompleteItem(updateItemQuantity);
    }

    const itemTypeIDChangeHandler = (e) => {
        let selectedIndex = e.target.options.selectedIndex
        setItemInstrumentID(e.target.options[selectedIndex].getAttribute('id'));
        let updateItemInstrumentType = completeItem;
        updateItemInstrumentType.InstrumentType_Id = e.target.options[selectedIndex].getAttribute('id');
        setCompleteItem(updateItemInstrumentType);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let errors = false;

        if (itemName.length == 0) {
            errors = true;
        }

        if (itemDescription.length == 0) {
            errors = true;
        }

        if (itemImage.length == 0) {
            errors = true;
        }

        if (itemPrice <= 0) {
            errors = true;
        }

        if (itemQuantity <= 0) {
            errors = true;
        }

        if (itemInstrumentID == 0) {
            errors = true;
        }

        if (errors) {
            alert("Please fill out all fields correctly.");
        }
        else {
            api.post('/api/ModifyInventory/AddNewProduct',  completeItem)
            alert("Item submitted!");
        }
    }

    return (
        <div className={classes.Form}>
            <h1>Add a new item!</h1>
            <form className={classes.InnerForm}>
                <span className={classes.FormItem}>
                    <label for="instrument type">Instrument Type:</label>
                    <select name='instruments' id='instruments' onChange={itemTypeIDChangeHandler}>
                        <option id={-1} selected hidden disabled>Select an Instrument</option>
                        {itemsToLoad}
                    </select>
                </span>
                <span className={classes.FormItem}><label for="name">Name:</label><input type='text' value={itemName} onChange={nameChangeHandler} /></span>
                <span className={classes.FormItem}><label for="image">Image URL:</label><input type='text' value={itemImage} onChange={imageChangeHandler} /></span>
                <span className={classes.FormItem}><label for="price">Price:</label><input type='number' value={itemPrice} onChange={priceChangeHandler} /></span>
                <span className={classes.FormItem}><label for="quantity">Quantity:</label><input type='number' value={itemQuantity} onChange={quantityChangeHandler} /></span>
                <span className={classes.FormItem}><label for="description">Description:</label><textarea type='text' value={itemDescription} onChange={descriptionChangeHandler} className={classes.FormDescription} /></span>
                <input className={classes.FormSubmit} type='submit' onClick={submitHandler} />
            </form>
        </div>
    )
}

export default AddItem