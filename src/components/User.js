import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

// import '../css/user.css'

export default function User() {

    const [data, setData] = useState({});
  
    const [formData, setFormData] = useState({
        userName:'',
        userEmail:'',
        userMobile:''
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

  const addUser = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    const url = 'http://localhost:8080/add/user';
    const reqData ={
      ...formData,
      name:formData.userName,
      email:formData.userEmail,
      mobile:formData.userMobile
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
        setData(res)
        if (!res.error) {
          alert("SUCCESS:- " + res.msgDescr)
        }
        else{
          alert("ERROR:- " + res.msgDescr)
        }
      }
      else{
        alert("ERROR:-" + response.json().msgDescr)
      }
    }
    catch (error) {
      alert(error)
    }

  }

  return (
    <>
      <div className='user' style={{background:"#dbdedc", height:"100%", width:"100%", display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div className='newUser' style={{background:"#efdb89", height:"60%", width:"60%", padding:'30px', border:'3px solid #4b6c1f', borderRadius:"20px"}}>
      {/* <div className='user'> */}
        {/* <div className='newUser'> */}
          <form onSubmit={addUser}>
            <div className="form-floating mb-5 mt-4"> 
              <input type="text" className="form-control" id="userName" style={{border: '2px solid green'}} onChange={handleChange}/>
              <label htmlFor="userName">User Name</label>
            </div>
            <div className="form-floating mb-5"> 
              <input type="email" className="form-control" id="userEmail" style={{border: '2px solid green'}} onChange={handleChange}/>
              <label htmlFor="userEmail">User Email</label>
            </div>
            <div className="form-floating mb-5"> 
              <input type="text" className="form-control" id="userMobile" style={{border: '2px solid green'}} onChange={handleChange}/>
              <label htmlFor="userMobile">User Mobile</label>
            </div>

            <div className='mt-5 mb-5' style={{display:'flex', justifyContent:'center', margin:'20px'}}>
              <button type="submit" style={{width:'48%', padding:'10px', margin:0, boxSizing:'border-box', border:'1px solid rgb(26, 41, 3)', borderRadius: '5px'}}>Submit</button>
            </div>

            
            {/* <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input type="email" class="form-control" id="email" aria-describedby="emailHelp"/>
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">Full Name</label>
              <input type="text" class="form-control" id="name"/>
            </div>  
            <div class="mb-3">
              <label for="name" class="form-label">Mobile Number</label>
              <input type="text" class="form-control" id="name"/>
            </div>  
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", marginTop:'40px'}}>
              <button type="submit" class="btn btn-primary" >Submit</button>
            </div> */}

          </form>
        </div>
      </div>
    </>
  )
}
