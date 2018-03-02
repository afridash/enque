import React, { Component } from 'react';
import {Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  AsyncStorage,
  TextInput} from 'react-native';
import Button from 'apsl-react-native-button'
import Header from './header'
import {Actions} from 'react-native-router-flux'
import { PowerTranslator, ProviderTypes, Translation } from 'react-native-power-translator';
import {insertSubscriber} from '../databases/schemas'
import realm from '../databases/schemas'

export default class Subscribe extends Component<{}> {
  constructor (props) {
    super (props)
    this.state = {
      email:''
    }
  }
  componentWillMount () {
    this.checkInternet()
    if (this.props.email) {
      this.setState({email:this.props.email})
    }
  }
  async checkInternet () {
    var status = await AsyncStorage.getItem('status')
    if (status === 'true') {
      this.setState({upload:true})
    }
  }
  save = () => {
    this.setState({isLoading:true})
    if (this.state.email !== '') {
      this.handleSave()
    }else {
      alert('Email must be valid')
      this.setState({isLoading:false})
    }
  }
  handleSave () {
    var user = {
      id: Math.floor(Date.now()/1000),
      email:this.state.email
    }
    //If there is internet access, upload online
    //Else save locally
    if (this.state.upload) {
      this.saveOnline (user)
    }else {
      this.saveOffline (user)
    }
  }
  saveOffline (user) {
    insertSubscriber(user).then(()=> {
      alert('Subscription successful')
      return Actions.replace('entryMethod')
    }).catch((error)=> {
      alert(`There was an error saving subscriber ${error}`)
      this.setState({isLoading:false})
    })
  }
  async saveOnline (user) {
    let response = await fetch('https://afridash.com/enque/saveSubscriber.php',{
      method:'POST',
      headers:{
        'Accept': 'application/json',
      },
      body: JSON.stringify(user)
    })
    let responseJson = await response.json()
    if (responseJson.success === '1') {
      this.setState({isLoading:false})
      return Actions.entryMethod()
    }else {
      this.saveOffline(user)
    }
  }
  render() {
    return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
        <Header noAdd={true} title='Subscribe' />
        <ScrollView style={styles.container}>
        <View style={{margin:10, flex:1}}>
        <View style={{flex:1}}>
          <Text style={styles.welcome}>
             Thank you for Voting
          </Text>
          <Text style={styles.text}>
            Leave your email to stay in touch and join a network of citizens sharing their views with the United Nations
          </Text>
        </View>
        <View style={styles.list}>
          <View style={{flex:1, borderBottomWidth: (Platform.OS === 'ios') ? 1 : 0,marginBottom:20, flexDirection:'row', alignItems:'center'}}>
            <Text style={{fontSize:16}} >Email address: &nbsp; &nbsp;</Text>
            <TextInput defaultValue={this.state.email} keyboardType='email-address' onChangeText={(email)=>this.setState({email})} style={{flex:1, height:70, fontSize:16}} placeholder='Email'/>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button isLoading={this.state.isLoading} onPress={this.save} style={styles.buttonStyle} textStyle={{fontSize: 18, color:'white'}}>Subscribe</Button>
          <Button onPress={Actions.entryMethod} style={styles.buttonStyle2} textStyle={{fontSize: 18, color:'white'}}>Skip</Button>
        </View>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list:{
    flex:2,
    marginTop:10,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
  },
  text:{
    fontSize: 20,
    },
    buttonContainer:{
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
      flex:1,
    },
    buttonStyle:{
      backgroundColor:'#1eaaf1',
      height:40,
      width:100,
      borderColor:'transparent',
      margin: 10
    },
    buttonStyle2:{
      backgroundColor:'#f44336',
      height:40,
      width:100,
      borderColor:'transparent',
      margin: 10
    },
});
