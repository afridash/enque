import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from 'react-native'
import Header from './header'
export default class Partners extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillMount () {

  }
  render () {
    return (
      <View style={styles.container}>
        <Header title='Partners' />
          <ScrollView style={styles.scroll}>
            <View style={styles.secondaryContainer}>
            <Image source={require('../assets/images/action.png')} style={styles.images} resizeMode={'contain'}/>
            <Image source={require('../assets/images/myworld.jpg')} style={styles.images} resizeMode={'contain'}/>
            <Image source={require('../assets/images/ossap.png')} style={styles.images} resizeMode={'contain'}/>
            <Image source={require('../assets/images/civic.jpg')} style={styles.images} resizeMode={'contain'}/>
            </View>
          </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  secondaryContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  scroll: {
    flex:1,
    marginTop:5,
  },
  images: {
    height:200,
    width:200,
    margin:10
  },
})
