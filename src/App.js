import logo from './logo.svg';
import classes from './App.css';
import Header from './Components/Header/Header.js'
import AddItem from './Components/AddItem/AddItem';
import Instruments from './Components/Instruments/Instruments.js';
import ErrorPage from './Components/ErrorPage/ErrorPage.js';
import AddInstrumentType from './Components/AddInstrumentType/AddInstrumentType';
import ProductPage from './Components/ProductPage/ProductPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path ="/" element={<Instruments />}/>
          <Route path ="/AddInstrument/" element={<AddItem />}/>
          <Route path ="/AddInstrumentType" element={<AddInstrumentType/>}/>
          <Route path ="/:productID" element={<ProductPage />} />
          <Route path = "/Contact" element={<ErrorPage />}/>
        </Routes>
      </div>
  );
}

export default App;
