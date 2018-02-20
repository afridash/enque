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
    this.setState({isLoading:true})
    if (this.state.email === 'sdg@sdg.com' && this.state.password === 'pass'){
        return Actions.reset('entryMethod')
    }else {
      alert('Wrong email/password combination')
      this.setState({isLoading:false})
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={{flex:1, backgroundColor:'#1d4869'}} behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView style={{flex:1}}>
          <View style={styles.container}>
            <View style={{flex:3, alignItems:'center', justifyContent:'center', marginTop:20}}>
              <Image source={require('../assets/images/icon.png')} resizeMode={'contain'} style={styles.logo} />
            </View>
            <View style={{flex:3, margin:10, justifyContent:'center', alignItems:'center', marginTop:30}}>
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
            <Button isLoading={this.state.isLoading} onPress={()=>this.login()} style={{backgroundColor: '#1eaaf1', borderWidth:0, borderColor:'transparent', margin:70}} textStyle={{fontSize: 20, color:'white'}}>
              Login
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
});
