import React, { useEffect, useState } from 'react'
import classes from './ProductPage.module.css';
import { useParams } from 'react-router';
import axios from 'axios'

const ProductPage = (props) => {
    const { productID } = useParams();
    const api = axios.create({
        baseURL: 'https://localhost:44323/',
    })
    const [isLoading, setIsLoading] = useState(true);
    const [item, setItem] = useState();
    const [newItemPrice, setNewItemPrice] = useState(0);
    const [newItemQuantity, setNewItemQuantity] = useState(0);

    const priceChangeHandler = (e) => {
        setNewItemPrice(e.target.value);
    }

    const priceItemQuantity = (e) => {
        setNewItemQuantity(e.target.value);
    }

    const updatePrice = () => {
        api.post(`api/ModifyInventory/AdjustPrice?product_Id=${productID}&newPrice=${newItemPrice}`).then(res => {
            console.log(res);
            alert("Price updated!");
            window.location.reload(false);
        }).catch(error => {
            console.log(error);
        })
    }

    const updateQuantity = () => {
        let updateInfo = {
            Id: productID,
            Quantity: newItemQuantity 
        }
        api.post(`api/ModifyInventory/AdjustQuantity?product_Id=${productID}&quantityToAdd=${newItemQuantity}`).then(res => {
            console.log(updateInfo);
            alert("Price updated!");
            window.location.reload(false);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        api.get('api/ReadInventory/GetProducts').then(res => {
            setItem(res.data.find(item => item.id == productID));
            setIsLoading(false);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    let itemToLoad = isLoading ? <p>Loading</p> :
        <div className={classes.Main}>
            <img src={item.imageLocation} className={classes.Image} />
            <span className={classes.Information}>
                <h1>{item.name}</h1>
                <p>{item.description}</p>
                <span> <p>Price: {item.price.toFixed(2)}</p> <input type='number' value={newItemPrice} onChange={priceChangeHandler}/> <button onClick={updatePrice}>Update Price</button></span>
                <span> <p>Quantity: {item.quantity}</p> <input type='number' value={newItemQuantity} onChange={priceItemQuantity}/> <button onClick={updateQuantity}>Update Quantity</button></span>
            </span>
        </div>

    return (
        <div>
            {itemToLoad}
        </div>
    )
}

export default ProductPage