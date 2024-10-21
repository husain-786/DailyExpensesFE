import React, { useState, useEffect } from 'react'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
export default function PriceToGive({priceToGet, allExpenses, currentBuyer, allPriceDetails}) {

  const dataTableHeader = [
    {field: 'userName', header: 'Buyer'},
    {field: 'totalPriceToPay', header: 'Price to Pay'}
  ];

  const [dataTableRecords, setDataTableRecords] = useState([
  ]);

  // fetching prices to pay.....
  useEffect(() => {
    priceToGive();
  }, [])

  const priceToGive = async () => {
    const url = 'http://localhost:8080/final/result';
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
            setDataTableRecords(res.finalCalculations);
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
    <div>
        <div className="card" style={{margin:'20px', overflow:'auto'}}>
          <DataTable id='contributer' value={dataTableRecords} stripedRows  tableStyle={{ minWidth: '50rem' }}>
              {dataTableHeader.map((col, i) => (
                  <Column key={col.field} field={col.field} header={col.header} />
              ))}
          </DataTable>
        </div>
        <div className="form-row" style={{display:'flex', justifyContent:'space-between'}}>
            <button type="submit" onClick={allPriceDetails}>previous</button>
            <button type="submit" onClick={priceToGet}>next</button>
        </div>
    </div>
  )
}
