/*
Author: Richard Igbiriki 
*/

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableHighlight,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import {queryAll, deleteSurvey, queryAllSubscribers, deleteSubscriber} from '../databases/schemas'
import realm from '../databases/schemas'
export default class Side extends Component<{}> {
  constructor (props) {
    super (props)
    this.state = {
      translated:'',
      surveys:[],
      subscribers:[],
    }
  }
  componentWillMount () {
    this.checkInternet()
    this.loadData()
  }
  loadData () {
    queryAll().then((surveys)=>{
      this.setState({surveys})
    }).catch((error)=> {
      alert(error)
    })
  }
  async checkInternet () {
    var status = await AsyncStorage.getItem('status')
    if (status === 'true') {
      this.setState({upload:true})
    }
  }
  async uploadSurveys () {
    try {
      this.state.surveys.forEach(async (survey)=> {
        let response = await fetch('https://afridash.com/enque/saveToMysql.php',{
          method:'POST',
          headers:{
            'Accept': 'application/json',
          },
          body: JSON.stringify(survey)
        });
        let responseJson = await response.json();
        if(responseJson.success === '1'){
          deleteSurvey(survey.id).then().catch((error)=>{
            alert(error)
          })
        }
      })
    }catch(error) {
      alert(error)
    }
    this.uploadSubscribers()
  }
  async uploadSubscribers () {
    this.state.subscribers.forEach( async (subscriber) => {
      let response = await fetch('https://afridash.com/enque/saveSubscriber.php',{
        method:'POST',
        headers:{
          'Accept': 'application/json',
        },
        body: JSON.stringify(subscriber)
      });
      let responseJson = await response.json();
      if(responseJson.success === '1'){
        deleteSubscriber(subscriber.id).then().catch((error)=>{
          alert(error)
        })
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sdg}>
          <TouchableHighlight onPress={()=>Actions.replace('sustainable')} style={{flex:1.5}}>
            <View style={{flex:1, flexDirection:'row'}}>
              <Image source={require('../assets/images/sus.png')} resizeMode={'contain'} style={styles.sdgImage} />
            </View>
          </TouchableHighlight>
        </View>
        <TouchableHighlight onPress={()=>Actions.replace('entryMethod')} style={styles.category}>
          <Text style={styles.text}>Home</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>Actions.replace('dashboard')} style={styles.category}>
          <Text style={styles.text}>Surveys</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>Actions.replace('myworld')} style={styles.category}>
          <Text style={styles.text}>My World 2030</Text>
        </TouchableHighlight>

        <TouchableHighlight  style={styles.category} onPress={()=>Actions.replace('login')}>
            <Text style={styles.text}>Change Partner Id</Text>
        </TouchableHighlight>
        {this.state.upload &&
        <TouchableHighlight onPress={()=>this.uploadSurveys()} style={styles.upload}>
          <Text style={styles.uploadButton}>Upload Surveys</Text>
        </TouchableHighlight>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  sdg: {
    flex:1,
    borderColor:'#15354e',
    borderTopWidth:25,
    borderBottomWidth:2,
  },
  sdgImage:{
    height:100,
    flex:1,
  },
  text: {
    fontSize:20,
    flex:1,
    fontWeight:'400',
  },
  category: {
    flex:0.5,
    flexDirection:'row',
    borderColor:'#15354e',
    padding:15,
    borderBottomWidth: (Platform.OS === 'ios') ? 1 : 0.5,

  },
  enque: {
    flex:1,
    backgroundColor:'purple'
  },
  upload: {
    flex:2,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-end'
  },
  uploadButton: {
    backgroundColor:'#1eaaf1',
    color:'white',
    fontSize:20,
    marginBottom:1,
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    padding:10,
    textAlign:'center',
    height:50,
  },
});
