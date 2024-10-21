import React from 'react'

export default function NotFound() {
  return (
    <div className='product' style={{background:"#dbdedc", height:"100%", width:"100%", display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div className='productAndExpense' 
          style={{height:"80%", width:"80%", overflow:'auto', scrollbarWidth:'none', display:'flex', justifyContent:'center',
                  alignItems:'center'}}>
          NOT FOUND
        </div>
    </div>
  )
}
