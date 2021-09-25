import React from 'react';
import { View, TouchableOpacity, Text} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();


export const App = () => {
  const onStartRecord = async () => {
  await audioRecorderPlayer.startRecorder();
  audioRecorderPlayer.addRecordBackListener((e) => {
    console.log('Recording . . . ', e.current_position);
     return;
    });
  };

 const onStopRecord = async () => {
  const audio = await audioRecorderPlayer.stopRecorder();
  audioRecorderPlayer.removeRecordBackListener();
  };

 return (
  <View class="pr-2" style={{flex: 10, justifyContent: 'center'}}>
   <TouchableOpacity style= {{justifyContent: 'center'}} onPress={onStartRecord}>
     <Text>Start</Text>
   </TouchableOpacity>

   <TouchableOpacity onPress={onStopRecord}>
     <Text>Stop</Text>
   </TouchableOpacity>
  </View>
 )};