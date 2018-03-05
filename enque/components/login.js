import React from 'react';
import {
  StyleSheet,
  Text,
  View ,
  Image,
  Platform,
  StatusBar,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  FlatList,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Button from 'apsl-react-native-button'

export default class Login extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      email:'',
      password:'',
      isLoading: false,
      data:[],
      modalVisible:false,
      partner:'Select Partner',
      partner_id:'',
      user_id:'',
      loading:true,
    }
    this.data = []
  }
  async componentWillMount () {
    var partners = await AsyncStorage.getItem('partners')
    if (partners) {
      var array = JSON.parse(partners)
      this.data = array
      this.setState({data:array, loading:false})
    }else {
      let response = await fetch("https://api.myworld2030.org/partners/?key=partner-1151125$%3")

      let responseJson = await response.json()
      this.data = responseJson
      this.setState({data:responseJson, loading:false})
      AsyncStorage.setItem('partners', JSON.stringify(responseJson))
    }

  }
  openModal() {
    this.setState({modalVisible:true});
  }
  closeModal() {
    this.setState({modalVisible:false});
  }
  _onPressItem (item) {
     this.setState({partner:item.long, partner_id:item.short, modalVisible:false})
  }
  _renderItem = ({ item, index }) => {
    return (
     <View
      style={styles.listItem}
    >
      <View style={{flex:1}}>
        <Text onPress={()=>this._onPressItem(item)} style={[styles.listText]}> {item.long} ({item.short})</Text>
      </View>

    </View>
      )
   }
   searchPartners(text){
    if (text === '') this.setState({data:this.data, noResult:false})
    else {
      var result = this.data.filter ((data) => data.long.toLowerCase().includes(text.toLowerCase()))
      if (result.length > 0)
      this.setState({data:result, noResult:false})
      else this.setState({noResult:true})
    }
  }
  _keyExtractor = (item, index) => index
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
                  placeholder='Search for Partner...'
                  onChangeText={(text) => { this.searchPartners(text) }}
                />
              </View>
              {this.state.loading ?  <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{textAlign:'center', fontSize:18}}>Loading...</Text>
                  </View> :
                <FlatList
                  data={this.state.data}
                  ItemSeparatorComponent={()=><View style={styles.separator}></View>}
                  renderItem={this._renderItem}
                  keyExtractor={this._keyExtractor}
                 />
               }
              </View>
            </View>
          </Modal>
    )
  }
  async login () {
    if (this.state.partner_id !== '' && this.state.user_id !== '') {
        await AsyncStorage.setItem('partner_id', this.state.partner_id)
        await AsyncStorage.setItem('user_id', this.state.user_id)
        return Actions.drawer()
    }else {
      alert("Partner and user id must be provided")
    }
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={{flex:1, backgroundColor:'#1d4869'}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView style={{flex:1}}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image source={require('../assets/images/icon.png')} resizeMode={'contain'} style={styles.logo} />
            </View>
            <View style={styles.inputContainer}>
              <TouchableHighlight onPress={()=>this.setState({modalVisible:true})} style={{flexDirection:'row', height:50, justifyContent:'space-between', alignItems:'center', borderWidth:1, borderRadius:5, borderColor:'lightgrey'}}>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}} >
                  <View style={{flex:1, flexDirection:'row',alignItems:'center'}}>
                    <Text style={{color:'white', fontSize:18, fontWeight:'500', padding:5}}>{this.state.partner}</Text>
                  </View>
                  <Image  source={require('../assets/images/rightarrow.png')} style={styles.right}/>
              </View>
              </TouchableHighlight>
            <View style={styles.divider}>
              <TextInput defaultValue={this.state.user_id} onChangeText={(text)=>this.setState({user_id:text})} style={styles.input} placeholder='User Id'/>
            </View>
            </View>
            <Button isLoading={this.state.isLoading} onPress={()=>this.login()} style={styles.buttonStyle} textStyle={styles.buttonText}>
              Begin
            </Button>
          </View>
          {this.showModal()}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d4869',
  },
  logo: {
    flex:4,
    alignItems:'center',
    justifyContent:'center',
    marginTop: 30,
  },
  app: {
    flex:0.5,
  },
  logoContainer:{
    flex:3,
    alignItems:'center',
    justifyContent:'center',
    marginTop:20
  },
  inputContainer:{
    flex:5,
    height:200,
    margin:10,
    justifyContent:'center',
    alignItems:'center',
    marginTop:30,
  },
  buttonStyle:{
    backgroundColor: '#1eaaf1',
    borderWidth:0,
    borderColor:'transparent',
    margin:70
  },
  buttonText:{
    fontSize: 20,
    color:'white'
  },
  modalContainer: {
   flex: 1,
   backgroundColor: 'white',
 },
 innerContainer: {
   flex:1,
   marginTop:20
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
   backgroundColor:'lightgrey',
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
  inputContainer2: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  right:{
    resizeMode: 'contain',
    width: 20,
    height: 20,
    alignItems:'flex-end',
    tintColor:'white',
  },
  divider:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
  },
});
