import React, { useEffect, useState } from 'react'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Product from './Product'
import UserExpenseDetails from './UserExpenseDetails'
import PriceToGet from './PriceToGet';
import PriceToGive from './PriceToGive';
import AllPriceDetail from './AllPriceDetail';

export default function Expenses() {

  const [pageStatus, setPageStatus] = useState({
    showProduct:true,
    showPriceToGive:false,
    showPriceToGet:false,
    showAllExpenses:false,
    showAllPriceDetail:false
  });

  const [currentBuyer, setCurrentBuyer] = useState({});

  const [isBuyerSelected, setIsBuyerSelected] = useState(false);

  const addProduct = () =>{
    setPageStatus(
      {
        showProduct:true,
        showPriceToGive:false,
        showPriceToGet:false,
        showAllExpenses:false,
        showAllPriceDetail:false
      }
    )
  }
  
  const priceToGive = () =>{
    setPageStatus(
      {
        showProduct:false,
        showPriceToGive:true,
        showPriceToGet:false,
        showAllExpenses:false,
        showAllPriceDetail:false
      }
    )
  }
  
  const priceToGet = () =>{
    setPageStatus(
      {
        showProduct:false,
        showPriceToGive:false,
        showPriceToGet:true,
        showAllExpenses:false,
        showAllPriceDetail:false
      }
    )
  }
  
  const allExpenses = () =>{
    setPageStatus(
      {
        showProduct:false,
        showPriceToGive:false,
        showPriceToGet:false,
        showAllExpenses:true,
        showAllPriceDetail:false
      }
    )
  }

  const allPriceDetails = () =>{
    setPageStatus(
      {
        showProduct:false,
        showPriceToGive:false,
        showPriceToGet:false,
        showAllExpenses:false,
        showAllPriceDetail:true
      }
    )
  }

  // When page is loaded that time useEffect is called...
  useEffect(() => {
    addProduct();
  }, [])  // This code will run only once on component mount

  useEffect(() => {
  }, [isBuyerSelected])  

  let currentPage = () => {

    console.log("buyerUuid:- " + currentBuyer.code)

    // if (buyerUuid != null){
    //   setIsBuyerSelected(true)
    // }

    if (pageStatus.showProduct){
      // here sending setBuyerUuid to save its value from product component when buyer is selected....
      return <Product onClick = {addProduct} currentBuyer = {currentBuyer} setCurrentBuyer = {setCurrentBuyer} addProduct = {addProduct} priceToGive = {priceToGive} priceToGet = {priceToGet} allExpenses = {allExpenses}  allPriceDetails = {allPriceDetails}/>
    }
    if (pageStatus.showPriceToGive){
      return <PriceToGive onClick = {priceToGive} currentBuyer = {currentBuyer} addProduct = {addProduct} priceToGive = {priceToGive} priceToGet = {priceToGet} allExpenses = {allExpenses} allPriceDetails = {allPriceDetails}/>
    }
    if (pageStatus.showPriceToGet){
      return <PriceToGet onClick = {priceToGet} currentBuyer = {currentBuyer} addProduct = {addProduct} priceToGive = {priceToGive} priceToGet = {priceToGet} allExpenses = {allExpenses} allPriceDetails = {allPriceDetails}/>
    }
    if (pageStatus.showAllExpenses){
      return <UserExpenseDetails onClick = {allExpenses} currentBuyer = {currentBuyer} addProduct = {addProduct} priceToGive = {priceToGive} priceToGet = {priceToGet} allExpenses = {allExpenses} allPriceDetails = {allPriceDetails}/>
    }
    if (pageStatus.showAllPriceDetail){
      return <AllPriceDetail onClick = {allPriceDetails} currentBuyer = {currentBuyer} addProduct = {addProduct} priceToGive = {priceToGive} priceToGet = {priceToGet} allExpenses = {allExpenses} allPriceDetails = {allPriceDetails}/>
    }
  }

  return (
    <>
      <div className='product' style={{background:"#dbdedc", height:"100%", width:"100%", display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div className='productAndExpense' style={{background:"#edf6f7", height:"85%", width:"85%", border:'3px solid #363d6b ', overflow:'auto', scrollbarWidth:'none'}}>
          <nav className="navbar navbar-expand-lg" style = {{background: "#363d6b"}}>
            <div className="container-fluid p-2" style={{display:"flex", justifyContent:"left"}}>

              <button type="button" class="btn btn-outline-light p-3 m-2" onClick={addProduct} style={pageStatus.showProduct == true ? {background:'white', color:'rgb(54, 61, 107)'}:{background:'rgb(54, 61, 107)', color:'white'}}>Add Product</button>

              <button type="button" class="btn btn-outline-light p-3 m-2" onClick={allExpenses} style={pageStatus.showAllExpenses == true ? {background:'white', color:'rgb(54, 61, 107)'}:{background:'rgb(54, 61, 107)', color:'white'}}>All Expenses</button>

              <button type="button" class="btn btn-outline-light p-3 m-2" onClick={allPriceDetails} style={pageStatus.showAllPriceDetail == true ? {background:'white', color:'rgb(54, 61, 107)'}:{background:'rgb(54, 61, 107)', color:'white'}}>All Price Details</button>

              <button type="button" class="btn btn-outline-light p-3 m-2" onClick={priceToGive} style={pageStatus.showPriceToGive == true ? {background:'white', color:'rgb(54, 61, 107)'}:{background:'rgb(54, 61, 107)', color:'white'}}>Payable Price</button>
              
              <button type="button" class="btn btn-outline-light p-3 m-2" onClick={priceToGet} style={pageStatus.showPriceToGet == true ? {background:'white', color:'rgb(54, 61, 107)'}:{background:'rgb(54, 61, 107)', color:'white'}}>Receivable Price</button>


              {/* <button type="button" class="btn btn-outline-light p-3 m-2" onClick={allExpenses} hidden = {{isBuyerSelected}}>All Expenses</button>
              <button type="button" class="btn btn-outline-light p-3 m-2" onClick={priceToGive} hidden = {{isBuyerSelected}}>Price to give</button>
              <button type="button" class="btn btn-outline-light p-3 m-2" onClick={priceToGet} hidden = {{isBuyerSelected}}>price to get</button> */}

            </div>
          </nav>       
          <div style={{overflow:'auto'}}>
            {currentPage()}
          </div>   
        </div>
      </div>
    </>
  )
}
