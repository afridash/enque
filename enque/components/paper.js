import React, { Component } from 'react';
import {Platform, StyleSheet,Text,View,Image, AsyncStorage, TouchableHighlight, ScrollView} from 'react-native';
import Button from 'apsl-react-native-button'
import Header from './header'
import { Actions } from 'react-native-router-flux';
import { PowerTranslator, ProviderTypes, Translation } from 'react-native-power-translator';
var key = 'AIzaSyCRBOQE2ZcuttQDxreNI1BbxBMDbX0XGEo'
var ImagePicker = require('react-native-image-picker')
Translation.setConfig(ProviderTypes.Google, key,'ig');
export default class Paper extends Component<{}> {
  constructor (props) {
    super (props)
    this.state = {
      translated:''
    }
  }
  componentWillMount () {
    this.launchCamera()
  }
  launchCamera () {
    var options = {
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    ImagePicker.launchCamera(options, (response)  => {
      if (response.didCancel) {
      }
      else if (response.error) {
      }
      else {
        let source = { uri: response.uri }
        let b64 = response.data
        this.setState({
          profilePicture: source.uri,
          dataString:b64,
          done:false
        })
      }
    });
  }
  async uploadImage () {
    this.setState({isLoading:true})
    let result = await checkForLabels(this.state.dataString)
    this.setState({returnedText:result.responses[0].textAnnotations[0].description, isLoading:false, done:true})
  }
  render() {
    return (
      <View style={styles.container}>
        <Header backButton={true} title='Paper Scan' noAdd={true} />
        <View style={{margin:10, flex:1}}>
        <View style={{flex:10, borderRadius:5, borderColor:'grey',borderWidth:2}}>
            {this.state.done ? <ScrollView style={{flex:1}}>
              <Text style={{flex:1, fontSize:16}}>{this.state.returnedText}</Text>
            </ScrollView>
             : <Image source={{uri: this.state.profilePicture}} style={{flex:1}} resizeMode={'stretch'} />}
        </View>
      <View style={{flex:1.5, flexDirection:'row'}}>
        <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', flex:1}}>
          <Button style={{backgroundColor:'#1eaaf1', height:40, width:100, borderColor:'transparent', margin: 10}} textStyle={{fontSize: 18, color:'white'}} onPress={Actions.submit}>Submit</Button>
        </View>
        <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', flex:1}}>
          <Button onPress={()=>this.launchCamera()} style={{backgroundColor:'#EB1C2E', height:40, width:100, borderColor:'transparent', margin: 10}} textStyle={{fontSize: 18, color:'white'}} >New</Button>
        </View>
        {!this.state.done &&
          <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', flex:1}}>
            <Button isLoading={this.state.isLoading} onPress={()=>this.uploadImage()} style={{backgroundColor:'#49A341', height:40, width:100, borderColor:'transparent', margin: 10}} textStyle={{fontSize: 18, color:'white'}}>Upload</Button>
          </View>
        }
      </View>
      </View>
      </View>
    );
  }
}
async function checkForLabels(base64) {
  console.log('Loading');
  return await
        fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCRBOQE2ZcuttQDxreNI1BbxBMDbX0XGEo', {
            method: 'POST',
            body: JSON.stringify({
                "requests": [
                    {
                        "image": {
                            "content": base64
                        },
                        "features": [
                            {
                                "type": "TEXT_DETECTION"
                            }
                        ]
                    }
                ]
            })
        }).then((response) => {
          console.log('success');
            return response.json();
        }, (err) => {
            console.error('promise rejected')
            console.error(err)
        });
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
