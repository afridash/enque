import React, { Component } from 'react';
import {Platform, StyleSheet,Text,View,Image} from 'react-native';
import Button from 'apsl-react-native-button'
import Header from './header'
import { Actions } from 'react-native-router-flux';
import vision from 'react-cloud-vision-api'
import { PowerTranslator, ProviderTypes, Translation } from 'react-native-power-translator';
var key = 'AIzaSyCRBOQE2ZcuttQDxreNI1BbxBMDbX0XGEo'
Translation.setConfig(ProviderTypes.Google, key,'ig');

export default class Paper extends Component<{}> {
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
        <Header backButton={true} title='Paper Scan Survey' />
        <View style={{margin:10, flex:1}}>
        <View style={{flex:10, borderRadius:5, borderColor:'grey',borderWidth:3}}>
          <Text style={styles.text}>
          </Text>
        </View>
      <View style={{flex:1, flexDirection:'row'}}>
        <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', flex:1}}>
          <Button style={{backgroundColor:'#1eaaf1', height:40, width:100, borderColor:'transparent', margin: 10}} textStyle={{fontSize: 18, color:'white'}} onPress={Actions.submit}>Submit</Button>
        </View>
        <View style={{flex:1, flexDirection:'row'}}>
          <View style={{alignItems:'center', justifyContent:'center',flex:1}}>
            <Image source={require('../assets/images/X.png')} style={styles.home}/>
          </View>
          <View style={{alignItems:'center', justifyContent:'center',  flex:1}}>
            <Image source={require('../assets/images/good.png')} style={styles.home}/>
          </View>
        </View>
      </View>
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
    flex:5,
    },
    home:{
      resizeMode: 'contain',
      width: 30,
      height: 30,
      alignItems:'flex-end',
      margin:10,
    },
});
