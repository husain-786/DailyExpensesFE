import React, { useContext, useEffect, useState } from 'react'
import './Product.css'
import 'bootstrap/dist/css/bootstrap.css';
// import { Dropdown } from 'react-bootstrap';
import {Dropdown} from 'primereact/dropdown';
import {ToggleButton } from 'primereact/togglebutton';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-cyan/theme.css";


export default function Product({allExpenses, currentBuyer, setCurrentBuyer}) {
  
  const [equalDistributed, setEqualDistributed] = useState(true);
  const [equallyDistributed, setEquallyDistributed] = useState({ name: 'YES', code: true });

  const [activeUserCompleteDetails, setSctiveUserCompleteDetails] = useState([])  // all list of active users...
  
  const [activeUsers, setActiveUsers] = useState([]); // contains active users fro buyer dropdown list....
  const[buyer, setBuyer] = useState({});  // current selected buyer....
  const [buyerUserEmail, setBuyerUserEmail] = useState(null);
  
  const[contributers, setContributers] = useState([]);  // current selected Contributer....
  const [activeContriUsers, setActiveContriUsers] = useState([]); // contains active users for contributors users dropdown list....
  const[contriListToSendToBackend, setContriListToSendToBackend] = useState();  // current selected Contributer....


  const [date, setDate] = useState(null); // date of purchase...

  const dataTableHeader = [
    {field: 'contriUserName', header: 'Contributer'},
    {field: 'price', header: 'Price'},
    {field: 'products', header: 'Products'}
  ];  

  const [dataTableRecords, setDataTableRecords] = useState([
  ]);

  const [formData, setFormData] = useState({
    buyer:'',
    buyerEmail:'',
    productList:'',
    totalPrice:'',
    date:'',
    equalDistributedFlag:'',
    contriPrice:''
  })

  // maintains the change value of any input through an event....
  const handleChange = (e) => {
    const {id, value } = e.target;
    // setFormData({...formData, [id]: value})
    setFormData({
      ...formData,
      [id]: value
    });
  };

  useEffect(() => {
    getAllActiveUsers();
  }, [])

  // useEffect used to reflect changes immadiately in buyer state.....
  useEffect(() => {

    setContributers([]) // resetting contributers list when changing buyer....

    console.log("buyer:-" + JSON.stringify(buyer))

    const contriUsers = []

    for (const userDtl of activeUserCompleteDetails){
      console.log(userDtl.userUuid + " ===> " + buyer.code + " ===> " + buyer.name)
      if (userDtl.userUuid === buyer.code){
        console.log("Email:-" + userDtl.userEmail)
        setBuyerUserEmail(userDtl.userEmail)
        const buyerEmail = document.getElementById('buyerEmail')
        buyerEmail.value = userDtl.userEmail;
      }
      // creating contributers dropdown options based on buyer user selected the buyer will not present in the contributers list.... 
      else{
        var contriUser = {"name" : userDtl.userName, "code" : userDtl.userUuid}
        contriUsers.push(contriUser)
      }
    }

    // updating contri users state according to buyer user.....
    setActiveContriUsers(contriUsers)

  }, [buyer]);

  // useEffect used to reflect changes immadiately in buyer state.....
  useEffect(() => {
    console.log("contributers2:- " + JSON.stringify(contributers) + " ====> " + equalDistributed)

    // if distributed status is changed then all the price and the data table must be empty.....
    // console.log("Form Data:- " + JSON.stringify(formData))

    console.log("DataTableRecords:- " + JSON.stringify(dataTableRecords))

  }, [contributers, equalDistributed, dataTableRecords]);


  
  const getAllActiveUsers = async () => {
  
    // Step 1: Create an AbortController instance
    const controller = new AbortController();
    const signal = controller.signal;

    const url = 'http://localhost:8080/get/all/active/users';
     
    const reqData = {
    }

    // Integrating API to save details....
    try{
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqData)
      });

      // console.log("Response:- " + await response.json())

      if (response.ok){
        const res = await response.json();
        console.log("Response:- " + JSON.stringify(res))
        if (!res.isError) {
          // alert("SUCCESS:- " + res.msgDescr)
          setSctiveUserCompleteDetails(res.usersList) // list of all active users....
          if (res.usersList != null && res.usersList.length > 0){
            var list = []
            for (const userDtl of res.usersList){
              const user = {
                name:userDtl.userName, code:userDtl.userUuid
              }
              list.push(user)
            }
            setActiveUsers(list);
            console.log(list)

            if (currentBuyer != null){
              setBuyer(currentBuyer)
            }
          }
        }
        else{
          // alert("ERROR:- " + res.msgDescr)
        }

        // const cities = [
        //   {name: 'New York', code: 'NY'},
        //   {name: 'Rome', code: 'RM'},
        //   {name: 'London', code: 'LDN'},
        //   {name: 'Istanbul', code: 'IST'},
        //   {name: 'Paris', code: 'PRS'}
        // ];

        // const type = typeof(cities)

        // console.log("Demo ==> " + type + " ==> " + cities)
      }
      else{
        alert("ERROR:-" + response.json().resultVO.msgDescr)
      }
    }
    catch (error) {
      alert(error)
    }
  };

  // when contri users list changes then this methid is called on change....
  const updateSelectedContriUser = (e) =>{
    // setContributers(e.value) // changing selected user value to current selected user.....

    // using call back function to update the changes immediately.....
    setContributers(e.value);

    console.log("e.value:- " + JSON.stringify(e.value))
    console.log("contributers:- " + JSON.stringify(contributers))

    // console.log("contributers1:- " + JSON.stringify(contributers))
    // if equally distributed then update all details in data table.....
    if (equalDistributed){
      var price = Math.ceil(formData.totalPrice/e.value.length);
      var tableData = []
      var contriUsersToSendToBE = []

      //for (var contributer of contributers){
      for (var contributer of e.value){
        var data = {
          contriUserName:contributer.name,
          contriUserUuid:contributer.code,
          price:price,
          products:formData.productList,
        }
        tableData.push(data)

        var contriDtlWithPrice = {
          name:contributer.code,
          code:price
        }
        contriUsersToSendToBE.push(contriDtlWithPrice)

      }

      setDataTableRecords(tableData);
      console.log("tableData:- " + JSON.stringify(tableData))
      setContriListToSendToBackend(JSON.stringify(contriUsersToSendToBE))
      console.log("contriUsersToSendToBE:- " + JSON.stringify(contriUsersToSendToBE))
    }
  };

  // Adding product details......
  const addProductDetails = async (e) =>{
    e.preventDefault();   // stops event == prevents reloading....  
    const url = 'http://localhost:8080/save/details';
    const reqData = {
      buyerUserUuid:buyer.code,
      contriUserDtls:contriListToSendToBackend,
      product:formData.productList,
      totalPrice:formData.totalPrice,
      buyDate:formData.buyDate
    }

    console.log("Req:- " + reqData)

    // Integrating API to save details....
    try{
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqData)
      });

      // console.log("Response:- " + await response.json())

      if (response.ok){
        const resp = await response.json();
        console.log("Product Response:- " + JSON.stringify(resp))

        if (resp != null){
          if (!resp.resultVO.isError) {
            alert("Details saved successfully");
            allExpenses();
          }
          else{
            alert("ERROR:- " + resp.resultVO.isError)
          }
        }
      }
      else{
        alert("ERROR:-" + response.json().resultVO.msgDescr)
      }
    }
    catch (error) {
      alert(error)
    }
  }

  return (
    <>    
      <div style={{overflow:'auto'}}>
        <form onSubmit={addProductDetails}>
          <div className="form-row">
            <div className='card dropdown' >
              <Dropdown 
                value={buyer} 
                onChange={
                  (e) => {
                    handleChange(e);
                    setBuyer(e.value) // changing selected user value to current selected user.....
                    setCurrentBuyer(e.value)
                    // after above setup the useeffect will be called where all the state changes will be done immediately....
                  }
                } 
                id = 'buyer'
                options={activeUsers} 
                optionLabel='name'
                placeholder="Select Buyer" 
                className="w-full md:w-14rem" 
                checkmark={true} 
                highlightOnSelect={false}
              />
            </div>
            {/* <input id = "buyerEmail" type="text" placeholder="Buyer Email" disabled/>  */}
            <InputText id = "buyerEmail" type="text" placeholder="Buyer Email" disabled/>
          </div>

          <div className="form-row">
            {/* <input id = 'productList' type="text" placeholder="Product List" />
            <input id = 'totalPrice' type="text" placeholder="Total Price" /> */}
            <InputText id = 'productList' type="text" placeholder="Product List" onChange={handleChange}/>
            <InputText id = 'totalPrice' type="text" placeholder="Total Price" onChange={handleChange}/>
          </div>
          
          <div className="form-row">
            <Calendar 
              style={{width:'48%'}}
              placeholder='Select Date'
              // className='form-row' 
              value={date} 
              onChange={
                (e) => {
                  handleChange(e);
                  setDate(e.value)
                }
              } 
              dateFormat="dd/mm/yy" 
              id = 'date'
            />

            <div className='card dropdown' >
              <Dropdown 
                value={equallyDistributed} 
                onChange={
                  (e) => {
                    handleChange(e);
                    setEquallyDistributed(e.value)
                    console.log("Good !!! " + e.value.code)
                    setEqualDistributed(e.value.code)
                    setDataTableRecords([])
                    setContriListToSendToBackend()
                  }
                } 
                id = 'equalDistributedFlag'
                options={[
                  { name: 'YES', code: true },
                  { name: 'NO', code: false }
                ]} 
                optionLabel='name'
                placeholder="Equally Distributed" 
                className="w-full md:w-14rem" 
                checkmark={true} 
                highlightOnSelect={false}
              />
            </div>
          </div>

          <div className='form-row'>

            {equalDistributed ? <input id = 'contriPrice' type="text" placeholder="Each User Contribution" hidden/> : <input id = 'contriPrice' type="text" placeholder="Each User Contribution"  onChange={handleChange}/>}

            <div className="card dropdown">
                <MultiSelect 
                  value={contributers}  // contains all contributers list.....
                  onChange={updateSelectedContriUser} 
                  id = 'contributers'
                  options={activeContriUsers}   // list of contributers that will reset when buyer changes....
                  optionLabel="name" 
                  placeholder="Select Contributers" 
                  maxSelectedLabels={1}   // if 1 is selected then name will be displayed but if more than 1 is selected then the couts will be shown....
                  className="w-full md:w-20rem" />
            </div>
          </div>
          
          <div className="card" style={{margin:'20px'}}>
            <DataTable id='contributer' value={dataTableRecords} stripedRows  tableStyle={{ minWidth: '50rem' }}>
                {dataTableHeader.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
          </div>
          
          <div className="form-row mt-5 mb-5" style={{display:'flex', justifyContent:'center'}}>
              <button type="submit">Submit</button>
          </div>
        </form> 

      </div>
    </>
  )
}
