import React , {Component, useImperativeHandle} from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./Record.css";
import ReactLoading from 'react-loading';
import axios from 'axios';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Record extends Component {
    constructor (props) {
       super(props)
       this.state = {
            isRecording: false,
            blobURL: '',
            blob: {} ,
            isBlocked: false,
            data: 0.0,
            gotresult: false,
            testing: false
  }

}

  start = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true, gotresult:false ,testing:false });
        }).catch((e) => console.error(e));
    }
  };
  
    test = (res) => {
        console.log(res);
        this.setState({
            testing:true, 
            gotresult:false
        });
        
        axios
            .post('/api/feature_extraction/',this.state.blob)
            .then((res)=> {
                console.log(res['data']['b'])
                this.setState((res) => ({
                   gotresult:true,
                   testing:false,
                   data:res['data']['b']
                   })
                )}
            );
  };

  stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        console.log(buffer);
        this.setState({ blobURL,blob, isRecording: false });
        
      }).catch((e) => console.log(e));
  };
    render () {
        return ( 
            <div className="main" >
                <div className="row col-12 offset-4 pt-5" stlye={{marginTop:"10px"}} >
                    <button class="bg-dark" style={{color:"white"}} onClick={this.start} disabled={this.state.isRecording}>  
                        Record  
                    </button>
                    <audio class="col-3" style={{marginRight:"0px"}} src={this.state.blobURL} controls="controls" />
                    <button class="bg-dark" style={{color:"white"}}  onClick={this.stop} disabled={!this.state.isRecording}>  
                       Stop    
                    </button>
                </div>
                <div className="row col-10 offset-3 pt-4 justify-self-center">

                    <button class="col-1 offset-2 bg-dark " style={{color:"white"}} onClick={this.test}>  
                       Test    
                    </button>
                    <a class="col-1 offset-1" href={this.state.blobURL} download="Audiofile.mp3" > 
                        <u>  Download </u>
                    </a>
                </div>
            {
              this.state.testing==true &&
              <div className="col-6 offset-4" >
                <ReactLoading class="row pt-5 offset-4" type="bars" color="black" height={'3%'} width={'9%'} />
              <p class="row offset-3 pl-4 text_center" style={{fontSize:"35px", alignItem:"center"}}> Testing... </p>
              </div>
            }
            
            {   
                   this.state.gotresult==true &&  
                    [             
                        this.state.data>0.6 ? 
                       		<p class="col-5 offset-4 pr-2 pt-5" style={{fontSize:"38px", color:"red", marginLeft:"30vw", marginTop:"60px"}}> <b> 
                        		You've got parkinson  
                        	</b> </p>    : 
                        	<p class="col-5 offset-4 pr-4 pt-5" style={{fontSize:"38px", color:"green", marginLeft:"27vw", marginTop:"60px"}}><b> 
                        		You don't have parkinson 
                        	</b></p> 
                    ]
            }

            </div>
    )}
}

export default Record;