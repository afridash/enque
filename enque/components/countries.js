import React, { Component } from 'react';
import {Platform, StyleSheet,Text,View,Image, TextInput,Picker, TouchableHighlight, FlatList} from 'react-native';
import Button from 'apsl-react-native-button'
import { Actions } from 'react-native-router-flux';
import Header from './header'
import countryList from './countryList'
import { PowerTranslator, ProviderTypes, Translation } from 'react-native-power-translator';
var key = 'AIzaSyCRBOQE2ZcuttQDxreNI1BbxBMDbX0XGEo'
Translation.setConfig(ProviderTypes.Google, key,'ig');

export default class Countries extends Component<{}> {
  constructor (props) {
    super (props)
    this.state = {
      data:countryList
    }
    this.countries = this.state.data
  }
  componentDidMount () {
  }
  _onPressItem (item) {
     return Actions.pop({refresh: {country:item.name, done:false}})
  }
  _renderItem = ({ item, index }) => {
    return (
     <View
      style={styles.listItem}
    >
      <View style={{flex:1}}>
        <Text onPress={()=>this._onPressItem(item)} style={[styles.listText]}> {item.name}</Text>
      </View>

    </View>
      )
   }
   searchcountries(text){
    if (text === '') this.setState({countries:this.countries})
    else {
      var result = this.countries.filter ((country) => country.name.toLowerCase().includes(text.toLowerCase()))
      if (result.length > 0)
      this.setState({data:result, noCountries:false})
      else this.setState({noCountries:true})
    }
  }
  _keyExtractor = (item, index) => item.code
  render (){
    return (
      <View style={styles.container}>
        <Header backButton={true} noAdd={true} title='Countries' />
        <View style={styles.secondaryContainer}>
        <View style={{flex:1}}>
          <View style={styles.inputContainer} >
        <TextInput
          style={styles.input}
          placeholder='Search for Countries...'
          onChangeText={(text) => { this.searchcountries(text) }}
        />
      </View>
        <FlatList
        data={this.state.data}
        ItemSeparatorComponent={()=><View style={styles.separator}></View>}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        />
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
  secondaryContainer: {
    flex: 1,
    margin:10,
  },
  list:{
    flex:2,
  },
  separator:{
    height:1,
    backgroundColor:'grey',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
  },
  listItem:{
    padding:20,
  },
  listText:{
    fontSize:16,
    margin:5,
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
    input: {
    height: 50,
    flex: 1,
    fontSize: 16,
    color:'black',
    backgroundColor: '#fafafa',
    borderRadius: 10,
    textAlign: 'center'
  },
  inputContainer: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
});
