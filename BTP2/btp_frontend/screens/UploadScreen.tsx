import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as DocumentPicker from 'expo-document-picker';

export default function UploadScreen() {

  const [URI, SetURI] = useState("");
  const [Disorder, setDisorder] = useState(-1);
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: false,});
    console.log(result.uri);
    SetURI(result.uri);
    setDisorder(-1);
  }
  const SendFile = async () => {
    let blob = await fetch(URI).then(r => r.blob());
    console.log(JSON.stringify(blob));
    setDisorder(-1);
    fetch('https://7c35-2405-201-2013-8803-1d34-7d8e-3910-d41c.ngrok.io/api/feature_extraction/', {
          method: 'POST',
          body: blob
    }).then(response=> response.json().then(data => setDisorder(data['b'])));;
  }
  return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Button
            title="Upload File"
            color="#AAA"
            onPress={pickDocument}
          />
        </TouchableOpacity>

        <Button
          title="Test Audio"
          color="#AAA"
          onPress={SendFile}
        />
      {
        Disorder != -1 ? 
          Disorder > 0.985 ?
      <Text style={{  textAlignVertical: "center",textAlign: "center", color:"red", fontWeight: 'bold' , fontSize:18 }}>You've Parkinson</Text> :
      <Text style={{ textAlignVertical: "center",textAlign: "center", color:"green", fontWeight: 'bold' , fontSize:18 }}>You don't have Parkinson</Text> :
      <Text> </Text> 
      }
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
 title: {
    marginTop: 16,
    paddingVertical: 8,
    // backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "left",
    fontSize: 30,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
