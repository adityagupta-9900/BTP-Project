import React, { Component,useState } from 'react';
import './App.css';
import { BrowserRouter,Router, Route, Link, Switch } from "react-router-dom";
import {Nav} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Record from './Pages/Record';
import Upload from './Pages/Upload';

import "bootstrap/dist/css/bootstrap.min.css"

// https://reactjsexample.com/react-component-for-loading-animations/

function App() {

   const [Recorder, setRecord]  = useState();
   const [Uploader, setUpload]  = useState();
   const [AboutInfo, setAboutInfo]  = useState(true);


  return (
    <div className="App" style={{ backgroundColor:"rgb(253,252,252)"}} >
      
        <header className=" App-header">      
            <p className="col-12 pt-3 text-center  " style={{fontSize:"50px", alignItems:"center"}}>  
                Parkinson Detection App
            </p>
            <p className=" col-12 text-center cento pt-3" style={{WebkitTextFillColor:"white", alignItems:"center" ,marginTop:"-13px" , fontSize:"21px"}}> 
                Helps you identify chances of you having Parkinson
            </p>
        </header>
    
     	<div className=" border-right border-left justify-content-center" style={{ height:"20px"}}>
     	
        	<div className="col-10 offset-1" > 
           		<Navbar className="border-right" bg="dark" variant="dark">
    				<Nav className="mr-auto">
      					<Nav.Link style={{marginRight:"20px"}} onClick={()=> {setRecord(false);setUpload(false);setAboutInfo(true);}}> 
      						About 
      		        	</Nav.Link>
      					<Nav.Link style={{marginRight:"20px"}} onClick={()=> {setRecord(true);setUpload(false);setAboutInfo(false); console.log(Recorder);}}> 
      						Record 
      					</Nav.Link>
      					<Nav.Link onClick={()=> {setRecord(false);setUpload(true);setAboutInfo(false);}}>  
      						Upload 
      					</Nav.Link>
    				</Nav>
       			</Navbar>
       		{
       			AboutInfo==true && 
       			<div className="col-10 pl-5" style={{marginRight:"25px"}}>
       				<br/> <br/>
       				<p style={{fontSize:"35px"}}>
       				   <u> <strong> How to test? </strong> </u> 
       				</p>

       				<p style={{fontSize:"18px"}}> 
       			   		If you have a file with your recoded voice, please navigate to Upload tab where you'd be able 
       			    	<br/> to upload and check
       		    	</p>
       		    	
       		    	<br/>
       				<p style={{fontSize:"18px"}}> 
       			    	If not, you can also go to Record tab where you'd be given option to record your voice and 
 						<br/> test. There you can also download your recorded voice.
       				</p>
       			</div>
       		}
            {
             	Recorder==true &&
             	 <Record/>
            }       
            {
             	Uploader==true &&
             	 <Upload/>
            }	

       		</div>
     	</div> 

    </div>
  );
}

export default App;


