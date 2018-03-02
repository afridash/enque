import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
  TextInput,
  TouchableHighlight,
  Modal,
  FlatList,
} from 'react-native';
import Button from 'apsl-react-native-button'
import Header from './header'
import countries from './countryList'
import {Actions} from 'react-native-router-flux'

export default class PaperSurvey extends Component<{}> {
  constructor (props) {
    super (props)
    this.state = {
      translated:'',
      finished:true,
      country:'Select Country',
      city:'',
      modalVisible:false,
      data:countries,
    }
    this.countries = countries
  }
  async componentWillMount () {
    var city = await AsyncStorage.getItem('city')
    var country = await AsyncStorage.getItem('country')
    if (country && city) {
      this.setState({country, city})
    }
  }
  _onPressItem (item) {
     this.setState({country:item.name,  modalVisible:false, _country:item.name})
  }
  _keyExtractor = (item, index) => item.code
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
  showModal () {
    return (
      <Modal
        visible={this.state.modalVisible}
        animationType={'slide'}
        onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.inputContainer2} >
                <TextInput
                  style={styles.input}
                  placeholder='Search for Countries...'
                  onChangeText={(text) => { this.searchcountries(text) }}
                />
              </View>
              <FlatList
                style={{marginBottom:50}}
                data={this.state.data}
                ItemSeparatorComponent={()=><View style={styles.separator}></View>}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                ListFooterComponent ={()=><Text style={{flexDirection:'row', alignItems:'center', justifyContent:'center', fontSize:18, textAlign:'center'}}>End of list</Text>}
               />
               <View style={{flex:0.1, flexDirection:'row', position:'absolute', bottom:0}}>
                 <Button
                   onPress={()=>this.setState({modalVisible:false})}
                   style={{backgroundColor:'#f44336', borderColor:'transparent', margin: 10, flex:1}}
                   textStyle={{fontSize: 18, color:'white'}}
                   disabled
                   >Close</Button>
               </View>
              </View>
            </View>
          </Modal>
    )
  }
  beginScan = async () => {
    if (this.state.country !== 'Select Country' && this.state.city !== '') {
      await AsyncStorage.setItem('country', this.state.country)
      await AsyncStorage.setItem('city', this.state.city)
      return Actions.paper()
    }
    else alert("Country and city must be provided")
  }
  render() {
    return (
      <View style={styles.container}>
        <Header backButton={true} noAdd={true} title='Paper Survey' />
        <View style={{margin:10, flex:1}}>
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <View style={{flex:5, justifyContent:'center'}}>
            <Text style={styles.text}>
              Survey forms are scanned and processed to return the text detected on the form. The text should be edited for accuracy before submission. Scans will be saved under the country, and city shown below
            </Text>
            <View style={{flex:1}}>
              <TouchableHighlight onPress={()=>this.setState({modalVisible:true})} >
                <View style={styles.select} >
                  <View style={{flex:1, flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:18, fontWeight:'500', padding:5}}>{this.state.country}</Text>
                  </View>
                  <Image  source={require('../assets/images/rightarrow.png')} style={styles.right}/>
                </View>
              </TouchableHighlight>

              <View style={styles.divider}>
                <TextInput defaultValue={this.state.city} onChangeText={(text)=>this.setState({city:text})} style={styles.input} placeholder='City'/>
              </View>
            </View>

          </View>
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
              <Button
                onPress={this.beginScan}
                style={{backgroundColor:'#1eaaf1', borderColor:'transparent', margin: 10, flex:1}}
                textStyle={{fontSize: 18, color:'white'}}
                disabled
                >Start</Button>
            </View>
        </View>
        {this.showModal()}
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
    flex:1,
    margin:10,
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
  divider:{
      flexDirection:'row',
      alignItems:'center',
    },
  right:{
      resizeMode: 'contain',
      width: 20,
      height: 20,
      alignItems:'flex-end',
      tintColor:'grey',
  },
  select:{
    flexDirection:'row',
    justifyContent:'space-between',
    height:50,
    alignItems:'center',
    marginBottom:10,
    borderWidth:1,
    borderColor:'lightgrey',
    borderRadius:5
  },
  modalContainer: {
   flex: 1,
 },
 innerContainer: {
   flex:1,
   marginTop:20
 },
 inputContainer2: {
   padding: 8,
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: 'transparent'
 },
 listItem:{
   padding:20,
 },
 listText:{
   fontSize:16,
   margin:5,
 },
 separator:{
   height:1,
   backgroundColor:'grey',
 },
});
