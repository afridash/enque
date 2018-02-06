import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native'
import Header from './header'
import Button from 'apsl-react-native-button'
import {updatePerson, deletePerson, insertPerson, queryAll, deleteAll} from '../databases/schemas'
import realm from '../databases/schemas'
export default class Survey extends Component {
  constructor (props) {
    super (props)
    this.state = {
      name:'',
      people:[]
    }
    realm.addListener('change', ()=> {
      this.reload()
    })
  }
  componentDidMount () {
    this.reload()
  }
  handleTextChange = text => {
    this.setState({name:text})
  }
  reload () {
    queryAll().then((people)=> {
      this.setState({people})
    }).catch((error)=> {
      alert('error')
      this.setState({people:[]})
    })
  }
  savePerson () {
    const person = {
      id: Math.floor(Date.now()/1000),
      name:this.state.name
    }
    insertPerson(person).then().catch((error)=> {
      alert(`Insert error ${error}`)
    })
    this.setState({name:''})
  }
  deletePerson (personId) {
    deletePerson(personId).then().catch((error)=> {
      alert(`Error deleting user ${error}`)
    })
  }
  renderItem = ({item, index})=> {
    return (
      <View style={{height:50}}>
        <Text onPress={()=>this.deletePerson(item.id)}>{item.name}</Text>
      </View>
    )
  }
  deleteAll() {
    deleteAll().then().catch((error)=>{
      alert(`Error deleting all ${error}`)
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Header title="Survey" backButton={true} noAdd={true}/>
        <Text style={styles.start}>Start New</Text>
        <TextInput style={{borderWidth:1, height:100}} placeholder={'Enter name'} onChangeText={this.handleTextChange} value={this.state.name}/>
          <Button onPress={()=>this.savePerson()} style={{backgroundColor: '#1eaaf1', borderWidth:0, borderColor:'transparent'}} textStyle={{fontSize: 18, color:'white'}}>
            Save </Button>
            <Button onPress={()=>this.deleteAll()} style={{backgroundColor: 'red', borderWidth:0, borderColor:'transparent'}} textStyle={{fontSize: 18, color:'white'}}>
              Delete </Button>
            <FlatList
            data={this.state.people}
            style={{flex:1}}
            renderItem={this.renderItem}/>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  start: {
    marginTop:10,
    textAlign:'justify'
  },
})
