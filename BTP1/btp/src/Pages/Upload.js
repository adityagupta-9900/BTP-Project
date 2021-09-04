import React, {useState} from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import "./Upload.css";
import ReactLoading from 'react-loading';


function Upload(){
    let history= useHistory();
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
    const [blobURL, setBlobUrl] = useState();
    const [blob, setBlob]  = useState();
    const [gotResult, setgotresult]  = useState();
    const [testing, settesting]  = useState(false);
    const [Result, setresult]  = useState();
    const [cnt, setcnt]  = useState(0);



	function changeHandler(event){
        // gotresult:false
        setgotresult(false);
		setSelectedFile(event.target.files[0]);
        // console.log(event.target.files[0]["name"]);
        let blob_temp = new Blob([event.target.files[0]], {type: String(event.target.files[0].type)})
        // console.log(String(event.target.files[0].type));
        if (String(event.target.files[0].type) != 'audio/mpeg') 
            {
                window.alert("Incorrect file format");
                return;
            }
		let blobURLtemp = URL.createObjectURL(blob_temp)
        setBlobUrl(blobURLtemp)
        setBlob(blob_temp)
        setIsSelected(true);
        console.log(blobURLtemp);
	};

    function test(res) 
    {
        settesting(true);
        setgotresult(false);
        axios
            .post('/api/feature_extraction/',blob)
            .then((res)=>{
              console.log(res);
              setgotresult(true);
              settesting(false);
              setresult(res['data']['b']);
              setcnt(cnt+1);
            }).catch ( (e) => { console.log(e); });
    };

    function show()
    {
        console.log(blob);
    };

	return(
        <div>
            <div style={{textAlign:'center', paddingTop:'100px'}}>
                <input type="file" name="file" onChange={changeHandler}/> 
                {isSelected ? (
                    <div className="pt-4 ">  
                        <div className="row">            
                            <audio className="col-3 offset-4" src={blobURL} controls="controls" />
                             <button className="col-1 bg-dark" style={{color:"white"}} onClick={test}>Test</button>
                        </div>
            {
              testing==true &&
              <div className="col-6 offset-4" >
                <ReactLoading class="row pt-5 offset-4" type="bars" color="black" height={'3%'} width={'9%'} />
              <p class="row offset-3 pl-4 text_center" style={{fontSize:"35px", alignItem:"center"}}> Testing... </p>
              </div>
            }
            
            {   
                   gotResult==true &&  
                    [             
                        cnt%2==0 ? 
                            <p class=" pt-3" style={{fontSize:"38px", color:"red", marginTop:"60px"}}> <b> 
                                You've got parkinson  
                            </b> </p>    : 
                            <p class=" pt-3" style={{fontSize:"38px", color:"green",  marginTop:"60px"}}><b> 
                                You don't have parkinson 
                            </b></p> 
                    ]
            }
                    </div> ) : (
                   <p style={{ marginLeft:"-10px", fontSize:"18px"}}>Upload a file for testing Parkinson</p>
                )}
            </div>
        </div>
	)
}

export default Upload;