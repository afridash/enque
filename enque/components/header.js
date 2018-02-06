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
export default class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      upload:false
    }
  }
  async componentWillMount (){
    this.checkInternet()
  }
  async checkInternet () {
    var status = await AsyncStorage.getItem('status')
    if (status === 'true') {
      this.setState({upload:true})
    }
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
      {this.props.title && <View style={styles.titleContainer}><Text style={[styles.title]}>{this.props.title}</Text></View>}
      <View style={styles.actions}>
        {this.state.upload && this.props.title ==='Surveys' && <TouchableWithoutFeedback  onPress={()=>Actions.pop({refresh: {done: true}})}>
          <Image
            source={require('../assets/images/upload.png')}
            style={[styles.backButton]} />
          </TouchableWithoutFeedback>}
        {!this.props.noAdd && <TouchableWithoutFeedback  onPress={Actions.survey1}>
          <View style={{flexDirection:'row', margin:15, justifyContent:'flex-start'}}>
              <Text style={styles.addText}>Add</Text>
              <Image
                source={require('../assets/images/add.png')}
                style={[styles.add]} />
          </View>
          </TouchableWithoutFeedback>
        }
      </View>

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
};
