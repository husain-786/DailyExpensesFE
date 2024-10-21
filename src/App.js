// import logo from './logo.svg';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import User from './components/User';        
import Expenses from './components/Expenses';
import Product from './components/Product';
import { PrimeReactProvider } from 'primereact/api';
import NotFound from './components/NotFound';

function App({ Component, pageProps }) {
  return (
    <>

      {/* <PrimeReactProvider>
          <Component {...pageProps} />
      </PrimeReactProvider> */}

      {/* <NavBar/> */}

      <PrimeReactProvider>
        <div style={{background:"#dbdedc", height:"100vh", width:"100vw"}}>
          <Router>
            <NavBar/>
            <Routes>
              <Route path="/" element={<User/>} />
              <Route path="/user" element={<User/>} />
              <Route path="/expense" element={<Expenses/>} />
              {/* If route not found show NOT FOUND page */}
              <Route path="*" element={<NotFound/>} /> 
            </Routes>
          </Router>
        </div>
      </PrimeReactProvider>
    </>



    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
