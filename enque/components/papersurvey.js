import React, { Component } from 'react';
import {Platform, StyleSheet,Text,View,Image, TextInput} from 'react-native';
import Button from 'apsl-react-native-button'
import Header from './header'
import { PowerTranslator, ProviderTypes, Translation } from 'react-native-power-translator';
import {Actions} from 'react-native-router-flux'
var key = 'AIzaSyCRBOQE2ZcuttQDxreNI1BbxBMDbX0XGEo'
Translation.setConfig(ProviderTypes.Google, key,'ig');

export default class PaperSurvey extends Component<{}> {
  constructor (props) {
    super (props)
    this.state = {
      translated:''
    }
  }
  componentDidMount () {
  }
  render() {
    return (
      <View style={styles.container}>
        <Header backButton={true} noAdd={true} title='Paper Survey' />
        <View style={{margin:10, flex:1}}>
          <View style={{flex:1}}></View>
        <View style={{flex:1}}>
          <Text style={styles.text}>
            Start Scanning the survey form of 1 person. Click on Start to begin, and click on End to save the form for that person
          </Text>
        </View>
          <Button onPress={Actions.paper} style={{backgroundColor:'#1eaaf1', borderColor:'transparent', margin: 10}} textStyle={{fontSize: 18, color:'white'}}>Start</Button>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list:{
    flex:1,
  },
  text:{
      margin:10,
    fontSize: 20,
    },
});
