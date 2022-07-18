import React, { useState, useEffect } from 'react'
import Instrument from './Instrument/Instrument';
import classes from './Instruments.module.css';
import axios from 'axios';


const Instruments = () => {

  const api = axios.create({
    baseURL: 'https://localhost:44323/'
  })

  // const [itemInstrumentID, setItemInstrumentID] = useState();
  const [inventory, setInventory] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('api/ReadInventory/GetProducts').then(res => {
      setInventory(res.data);
      setIsLoading(false);
    }).catch(error => {
      console.log(error);
    });
  }, [])


  // const itemTypeIDChangeHandler = (e) => {
  //   let selectedIndex = e.target.options.selectedIndex
  //   setItemInstrumentID(e.target.options[selectedIndex].getAttribute('id'));
  // }

  // let itemOptions = [];

  // if (isLoading == false) {
  //   inventory.map((item, i) => {
  //     itemOptions.push(<option key={i} id={item.id}>{item.type}</option>);
  //   })
  //   console.log(inventory);
  // }

  // let itemsToLoad = isLoading ? <option>Loading</option> : itemOptions

  let inventoryDisplay = [];

  if (!isLoading) {
    inventory.map((obj, i) => {
      inventoryDisplay.push(<Instrument
        name={obj.name}
        price={obj.price.toFixed(2)}
        url={obj.imageLocation}
        id={obj.id}
        description={obj.description}
        quantity={obj.quantity}
        key={i}
      />)
    })
  }

  let mainDisplay = isLoading ? <p>Loading</p> : inventoryDisplay;

  return (
    <div className={classes.Body}>
      {/* <label for="instrument type">Instrument Type:</label>
      <select name='instruments' id='instruments' onChange={itemTypeIDChangeHandler}>
        <option id={-1} selected hidden disabled>Select an Instrument</option>
        {itemsToLoad}
      </select> */}
      {mainDisplay}
    </div>
  )
}

export default Instruments