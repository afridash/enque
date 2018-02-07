import React, { Component } from 'react';
import {Platform, StyleSheet,Text,View,Image} from 'react-native';
import Button from 'apsl-react-native-button'
import { Actions } from 'react-native-router-flux';
import Header from './header'
import { PowerTranslator, ProviderTypes, Translation } from 'react-native-power-translator';
var key = 'AIzaSyCRBOQE2ZcuttQDxreNI1BbxBMDbX0XGEo'
Translation.setConfig(ProviderTypes.Google, key,'ig');

export default class Submit extends Component<{}> {
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
        <Header backButton={true} title='Submit' noAdd={true} />
        <View style={{flex:2}}></View>
        <View style={{flex:1}}>
          <Text style={styles.text}>
            You have successfully completed scanning the survey for this individual
          </Text>
        </View>
        <View style={styles.list}>
          <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row' }}>
            <Button onPress={Actions.dashboard} style={{backgroundColor:'#1eaaf1', height:40, width:100, borderColor:'transparent', margin: 10}} textStyle={{fontSize: 18}}>Homepage</Button>
          </View>
          <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
            <Button onPress={()=>Actions.replace('paper')} style={{backgroundColor:'#1eaaf1', height:40, width:200, borderColor:'transparent', margin: 10}} textStyle={{fontSize: 18}}>Take another Survey</Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  list:{
    backgroundColor:'#F5FCFF',
    flex:5,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
  },
  text:{
    fontSize: 20,
    margin:10,
    },
});
