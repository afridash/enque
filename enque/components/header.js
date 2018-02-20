/*
Author: Richard Igbiriki
@2018
1. Previously stored surveys are retrieved...if there is data connection
2. Display upload button on dashboard and entry method
3. Upload surveys and subscribers
4. Delete stored information from device
*/
import {
 View,
 Image,
 TouchableWithoutFeedback,
 Text,
 Platform,
 AsyncStorage,
} from 'react-native';
import React, { Component } from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';
import {queryAll, deleteSurvey, queryAllSubscribers, deleteSubscriber} from '../databases/schemas'
import realm from '../databases/schemas'
export default class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      upload:false,
      surveys:[],
      subscribers:[]
    }
  }
  async componentWillMount (){
    this.checkInternet()
  }
  loadData () {
    queryAll().then((surveys)=>{
      this.setState({surveys})
    }).catch((error)=> {
      alert(error)
    })
    queryAllSubscribers().then((subscribers) => {
      this.setState({subscribers})
    }).catch((error) => {
      alert(error)
    })
  }
  async checkInternet () {
    var status = await AsyncStorage.getItem('status')
    if (status === 'true') {
      this.setState({upload:true})
      this.loadData()
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
      <View style={[styles.navBar]}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{flexDirection: 'row'}}>
          {
            (()=>{
              if (this.props.backButton) {
                return ( <TouchableWithoutFeedback  onPress={()=>Actions.pop({refresh: {done: true}})}>
                  <Image
                    source={require('../assets/images/arrow_left.png')}
                    style={[styles.backButton]} />
                  </TouchableWithoutFeedback>)
              }else {
                  return (<TouchableWithoutFeedback  onPress={Actions.drawerOpen}>
                    <Image
                      source={require('../assets/images/menu.png')}
                      style={[styles.backarrowStyle]} />
                    </TouchableWithoutFeedback>)
              }
            })()
          }
        </View>
          {
            (()=>{
              if (this.props.icon) {
                return (
                  <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                  <Image
                    source={require('../assets/images/icon.png')}
                    style={[styles.icon]} />
                    {this.state.surveys.length > 0 && <TouchableWithoutFeedback  onPress={()=>this.uploadSurveys()}>
                      <Image
                        source={require('../assets/images/upload.png')}
                        style={[styles.backButton, {alignItems:'flex-end', justifyContent:'flex-end'}]} />
                      </TouchableWithoutFeedback>}
                  </View>
                )
              }
            })()
          }

      {this.props.title && <View style={styles.titleContainer}><Text style={[styles.title]}>{this.props.title}</Text></View>}
        {this.state.upload && this.props.title ==='Surveys' && <View style={styles.actions}><TouchableWithoutFeedback  onPress={()=>this.uploadSurveys()}>
          <Image
            source={require('../assets/images/upload.png')}
            style={[styles.backButton]} />
          </TouchableWithoutFeedback></View>}

        {!this.props.noAdd && <View style={styles.actions}><TouchableWithoutFeedback onPress={Actions.survey}>
          <View style={{flexDirection:'row', margin:15, justifyContent:'flex-start'}}>
              <Text style={styles.addText}>Add</Text>
              <Image
                source={require('../assets/images/add.png')}
                style={[styles.add]} />
          </View>
        </TouchableWithoutFeedback></View>
        }

    </View>
</View>
    );
  }
}
const styles = {
  backarrowStyle: {
    resizeMode: 'contain',
    flexDirection: 'row',
    width: 60,
    height: 60,
    left: 0,
    justifyContent: 'flex-start'
  },
  backButton:{
    resizeMode: 'contain',
    flexDirection: 'row',
    width: 30,
    height: 30,
    tintColor:'white',
    left: 0,
    justifyContent: 'flex-start',
    margin:15,
    padding:15,
  },
  title:{
    fontSize:16,
    fontFamily:(Platform.OS === 'ios') ? 'verdana' : 'serif',
    fontWeight:'700',
    color:'white',
  },
  titleContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'flex-start',
  },
  navBar: {
    borderColor:'#15354e',
    backgroundColor: '#1c4868',
    borderTopWidth: (Platform.OS === 'ios') ? 20 : 0,
    borderBottomWidth:0.5,
    shadowColor:'#000000',
    shadowOffset:{width: 5, height: 5},
    shadowOpacity:0.5,
    shadowRadius:5,
  },
  actions: {
    flex:0.5,
    alignItems:'center',
    justifyContent:'flex-end',
    flexDirection:'row',
  },
  add: {
    resizeMode: 'contain',
    flexDirection: 'row',
    width: 28,
    height: 28,
    left: 0,
    tintColor:'white',
    justifyContent: 'flex-start',
  },
  addText: {
    textAlign:'center',
    fontSize:21,
    color:'white',
    fontWeight:'700'
  },
  icon: {
    width:50,
    height:50,
    margin:5,
    resizeMode:'contain',
  },
};
