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
  AsyncStorage
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
    }
  }
  login () {
    if (this.state.password !== '' && this.state.password === 'hack') {
      this.setState({isLoading:true})
      AsyncStorage.setItem('partner_id', this.state.password)
      return Actions.reset('drawer')
    }else alert('Incorrect partner id')
  }
  render() {
    return (
      <KeyboardAvoidingView style={{flex:1, backgroundColor:'#1d4869'}} behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView style={{flex:1}}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image source={require('../assets/images/icon.png')} resizeMode={'contain'} style={styles.logo} />
            </View>
            <View style={styles.inputContainer}>
              <View style={{flex:1, width:400, marginTop:10}}>
                <TextInput
                  style={{
                    fontSize:16,
                    color:'white',
                    height:50,
                    marginLeft:20,
                    marginRight:20,
                    textAlign:'center',
                    flex:1,
                  }}
                  returnKeyType='go'
                  ref={(input) => this.passwordinput = input}
                  autoCorrect={false}
                  autoCapitalize='none'
                  keyboardAppearance='dark'
                  placeholder={'Partner Id '}
                  placeholderTextColor={'white'}
                  onSubmitEditing={() => { this.login() }}
                  onChangeText={(password) => this.setState({password})}
                  secureTextEntry
                />
              </View>
            </View>
            <Button isLoading={this.state.isLoading} onPress={()=>this.login()} style={styles.buttonStyle} textStyle={styles.buttonText}>
              Begin
            </Button>
          </View>
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
    flex:3,
    margin:10,
    justifyContent:'center',
    alignItems:'center',
    marginTop:30
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
  }
});
