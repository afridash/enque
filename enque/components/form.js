import React, { Component } from 'react';
import {Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Picker,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
  KeyboardAvoidingView,
  } from 'react-native';
import Button from 'apsl-react-native-button'
import { Actions } from 'react-native-router-flux';
import moment from 'moment'
import Header from './header'
import {insertSurvey} from '../databases/schemas'
import realm from '../databases/schemas'

export default class Form extends Component<{}> {
  constructor (props) {
    super (props)
    this.state = {
      translated:'',
      country:'Country',
      partner_id:'',
      user_id:''
    }
  }
  async componentWillMount () {
    var partner_id = await AsyncStorage.getItem('partner_id')
    var user_id = await AsyncStorage.getItem('user_id')
    this.setState({partner_id, user_id})
    this.checkInternet()
    if (this.props.userInfo) {
      this.updateUserInfo()
    }
  }
  updateUserInfo () {
    var data = this.props.userInfo
    this.setState({
      gender:data.gender,
      age:data.age,
      education:data.education,
      disability:data.disability,
      city:data.city,
      country:data.country,
      email:data.email,
    })
  }
  async checkInternet () {
    var status = await AsyncStorage.getItem('status')
    if (status === 'true') {
      this.setState({upload:true})
    }
  }
  componentWillReceiveProps (p) {
    if (!p.done) {
      this.setState({country:p.country})
    }
  }
  async submit () {
    this.setState({isLoading:true})
    var data = this.props.data
    var auth = this.authenticateData()
    if (auth) {
      if (this.state.disability === '0') {
        data['disability'] = 'no'
        data['disability_type'] = 0
      }else {
        data['disability'] = 'yes'
        data['disability_type'] = Number(this.state.disability)
      }
      data['gender'] = this.state.gender
      data['education_level'] = Number(this.state.education)
      data['city'] = this.state.city
      data['age'] = Number(this.state.age)
      data['country'] = this.state.country
      data['partner_id'] = this.state.partner_id
      data['user_id'] = this.state.user_id
      data['start'] = Date.now()
      data['end'] = Date.now()
      data['method'] = 'online'
      data['submission_date'] = Date.now()
      data['id'] = Math.floor(Date.now()/1000)
      if (this.state.upload) {
        this.saveOnline(data)
      }else {
        insertSurvey(data).then(()=>{
          this.setState({isLoading:false})
          return Actions.subscribe({email:this.state.email})
        }).catch((error)=> {
          this.setState({isLoading:false})
           alert(`Insert error ${error}`)
        })
      }
    }else {
      this.setState({isLoading:false})
      alert('Incomplete form. Fill all fields.')
    }
  }
  authenticateData () {
    return this.state.disability && this.state.gender && this.state.education && this.state.age && this.state.country && this.state.city
  }
  async saveOnline (data) {
    let response = await fetch('https://afridash.com/enque/saveToMysql.php',{
      method:'POST',
      headers:{
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    })
    let responseJson = await response.json()
    if (responseJson.success === '1') {
      this.setState({isLoading:false})
      return Actions.subscribe({email:this.state.email})
    }else {
      alert(responseJson.success)
      insertSurvey(data).then(()=>{
        this.setState({isLoading:false})
        return Actions.subscribe({email:this.state.email})
      }).catch((error)=> {
        this.setState({isLoading:false})
         alert(`Insert error ${error}`)
      })
    }
  }
  render() {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
        <Header title='Demographics' backButton={true} noAdd={true} />
      <ScrollView style={styles.container}>
        <View style={styles.secondaryContainer}>
        <View style={{flex:1}}>
          <Text style={styles.welcome}>
            Almost There...
          </Text>
          <Text style={styles.text}>
            Your votes will remain anonymous, but this basic data will help us understand you better
          </Text>
        </View>
          <View style={styles.list}>
            <View style={styles.divider}>
              <Image source={require('../assets/images/Gender.png')} style={styles.home}/>
              <Picker
                style={{flex:1}}
                selectedValue={this.state.gender}
                onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
                <Picker.Item value='' label='' />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Male" value="male" />
              </Picker>
            </View>
            <View style={styles.divider}>
              <Image source={require('../assets/images/edu.png')} style={styles.home}/>
              <Picker
                style={{flex:1}}
                selectedValue={this.state.education}
                onValueChange={(itemValue, itemIndex) => this.setState({education: itemValue})}>
                <Picker.Item value='' label='' />
                <Picker.Item label="Some Primary" value="1" />
                <Picker.Item label="Finished Primary" value="2" />
                <Picker.Item label="Finished Secondary" value="3" />
                <Picker.Item label="Beyond Secondary" value="4" />
              </Picker>
            </View>
            <TouchableHighlight style={styles.divider} onPress={Actions.countries}>
              <View style={{flex:1,flexDirection:'row', justifyContent:'space-between'}} >
                <View style={{flex:1, flexDirection:'row',alignItems:'center'}}>
                  <Image source={require('../assets/images/globe2.png')} style={styles.home}/>
                  <Text>{this.state.country}</Text>
                </View>
                <Image  source={require('../assets/images/rightarrow.png')} style={styles.right}/>
            </View>
          </TouchableHighlight>
            <View style={styles.divider}>
              <Image source={require('../assets/images/loc.png')} style={styles.home}/>
              <TextInput defaultValue={this.state.city} onChangeText={(text)=>this.setState({city:text})} style={styles.input} placeholder='City/Town'/>
            </View>
            <View style={styles.divider}>
              <Image source={require('../assets/images/age.png')} style={styles.home}/>
              <TextInput defaultValue={this.state.age} onChangeText={(text)=>this.setState({age:text})} style={styles.input} placeholder='Age'/>
            </View>

            <View style={{flex:1,borderBottomWidth:0.5,flexDirection:'row', alignItems:'center', borderColor:'lightgrey'}}>
              <Image source={require('../assets/images/disability.png')} style={styles.home}/>
              <Picker
                style={{flex:1}}
                selectedValue={this.state.disability}
                onValueChange={(itemValue, itemIndex) => this.setState({disability: itemValue})}>
                <Picker.Item value='' label='' />
                <Picker.Item label="None" value="0" />
                <Picker.Item label="Physical" value="1" />
                <Picker.Item label="Vision" value="2" />
                <Picker.Item label="Hearing" value="3" />
                <Picker.Item label="Speaking" value="4" />
                <Picker.Item label="Other" value="5" />
              </Picker>
            </View>
          </View>
        <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
          <Button isLoading={this.state.isLoading} style={styles.submit} textStyle={{fontSize: 18, color:'white'}} onPress={()=>this.submit()}>Submit</Button>
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
  secondaryContainer: {
    flex: 1,
    margin:10,
  },
  list:{
    flex:2,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
  },
  submit:{
    backgroundColor:'#1eaaf1',
     height:40,
    width:100,
    borderColor:'transparent',
    margin: 10,
  },
  home:{
    resizeMode: 'contain',
    width: 30,
    height: 30,
    alignItems:'flex-end',
    margin:10,
  },
  divider:{
    flex:1,
    borderBottomWidth:0.5,
    marginBottom:20,
    flexDirection:'row',
    alignItems:'center',
    borderColor:'lightgrey',
  },
  right:{
    resizeMode: 'contain',
    width: 20,
    height: 20,
    alignItems:'flex-end',
    tintColor:'grey',
  },
  text:{
    fontSize: 20,
    },
    input:{
      flex:1,
      textAlign:'center',
      height:45,
    },
});
