import React, { useState, useEffect } from 'react'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export default function UserExpenseDetails({addProduct, priceToGive, currentBuyer, allPriceDetails}) {
  
  const dataTableHeader = [
    {field: 'buyerName', header: 'Buyer'},
    {field: 'productPrice', header: 'Price'},
    {field: 'buyDate', header: 'Date'},
    {field: 'product', header: 'Products'}
  ];

  const [dataTableRecords, setDataTableRecords] = useState([
  ]);

  
  // fetching complete details.....
  useEffect(() => {
    allProductDetails();
  }, [])

  const allProductDetails = async () => {
    const url = 'http://localhost:8080/get/complete/details';
    const reqData ={
      // buyerUserUuid:'2252eed9-b6cd-40a2-a042-dc6f66204e37'
      buyerUserUuid:currentBuyer.code
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
        console.log("res:- " + JSON.stringify(res))
        if (!res.resultVO.isError) {
          setDataTableRecords(res.productDetailsVOs);
          // alert("SUCCESS:- " + res.resultVO.msgDescr)
        }
        else{
          alert("ERROR:- " + res.resultVO.msgDescr)
        }
      }
      else{
        alert("ERROR:-" + response.json().msgDescr)
      }
    }
    catch (error) {
      alert(error)
    }
  };
  
  
  return (
    <>
      <div>
        <div className="card" style={{margin:'20px', overflow:'auto'}}>
          <DataTable id='contributer' value={dataTableRecords} stripedRows  tableStyle={{ minWidth: '50rem' }}>
              {dataTableHeader.map((col, i) => (
                  <Column key={col.field} field={col.field} header={col.header} />
              ))}
          </DataTable>
        </div>
        <div className="form-row" style={{display:'flex', justifyContent:'space-between'}}>
            <button type="submit" onClick={addProduct}>previous</button>
            <button type="submit" onClick={allPriceDetails}>next</button>
        </div>
      </div>
    </>
  )
}
