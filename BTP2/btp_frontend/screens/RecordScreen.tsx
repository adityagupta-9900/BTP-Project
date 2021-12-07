import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Button, Image } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Audio } from 'expo-av';
import { identifier } from '@babel/types';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import axios from "axios";



let recording = new Audio.Recording();

export default function RecordScreen({ navigation }: RootTabScreenProps<'Record'>) {

  const [RecordedURI, SetRecordedURI] = useState("");
  const [AudioPerm, SetAudioPerm] = useState(false);
  const [isRecording, SetisRecording] = useState(false);
  const [isPLaying, SetisPLaying] = useState(false);
  const [Disorder, setDisorder] = useState(-1);
  const [audioBlob, SetAudioBlob] = useState();
  const Player = useRef(new Audio.Sound());

  useEffect(() => {
    GetPermission();
  }, []);

  const GetPermission = async () => {
    const getAudioPerm = await Audio.requestPermissionsAsync();
    SetAudioPerm(getAudioPerm.granted);
  };

  const startRecording = async () => {
    setDisorder(-1);
    if (AudioPerm === true) {
      try {
        await recording.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        await recording.startAsync();
        SetisRecording(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      GetPermission();
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const result = recording.getURI();
      let res="";
      if(result!=null)
        res=result;
      SetRecordedURI(res); // Here is the URI
      recording = new Audio.Recording();
      SetisRecording(false);
    } catch (error) {
      console.log(error);
    }
  };

  const playSound = async () => {
    try {
      if(isPLaying===true){
        await Player.current.unloadAsync();
      }
      const result = await Player.current.loadAsync(
        { uri: RecordedURI },
        {},
        true
      );
      Player.current.playAsync();
      SetisPLaying(true);
    } catch (error) {
      console.log(error);
    }
  };

  const stopSound = async () => {
    try {
      const checkLoading = await Player.current.getStatusAsync();
      if (checkLoading.isLoaded === true) {
        await Player.current.stopAsync();
        SetisPLaying(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadFile = async () => {
    let blob = await fetch(RecordedURI).then(r => r.blob());
    SetAudioBlob(blob);
    console.log(JSON.stringify(audioBlob));
    let data={"blob":blob};
    fetch('https://7c35-2405-201-2013-8803-1d34-7d8e-3910-d41c.ngrok.io/api/feature_extraction/', {
          method: 'POST',
          body: blob
    }).then(response=> response.json().then(data => setDisorder(data['b'])));
  }

  return (
    <View style={styles.container}>
      <Button
        title={isRecording ? 'Stop' : 'Start'}
        color="#AAA"
        onPress={isRecording ? () => stopRecording() : () => startRecording()}
      />
      <Button
        title="Play audio"
        color="#AAA"
        onPress={()=>playSound()}
      />
      {/* <Text>{RecordedURI}</Text> */}
      <Button
        title="Test audio"
        color="#AAA"
        onPress={()=>loadFile()}
      />
      {
        Disorder != -1 ? 
          Disorder > 0.5 ?
      <Text style={{  textAlignVertical: "center",textAlign: "center", color:"red", fontWeight: 'bold' , fontSize:18 }}> You've Parkinson </Text>:
       <Text style={{ textAlignVertical: "center",textAlign: "center", color:"green", fontWeight: 'bold' , fontSize:18 }}> You don't have Parkinson </Text> 
      :
      <Text> </Text> 
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
   btext: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 2,
    width: '100%',
  },
});
