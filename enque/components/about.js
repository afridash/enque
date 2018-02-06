import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native'
import Header from './header'
export default class About extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillMount () {

  }
  render () {
    return (
      <View style={styles.container}>
        <Header title='About Enque' />
        <ScrollView style={styles.scroll}>
          <Text style={styles.about}>The UN SDG Action Campaign is a special initiative of the UN-Secretary General, administered by the UNDP ""to create awareness about the 2030 Agenda, empower and inspire people across the world to achieve the Sustainable Development Goals (SDGs) while generating political will, and help make the Goals attainable by 2030.
             The UN SDG Action Campaign is a special initiative of the UN-Secretary General, administered by the UNDP to create awareness about the 2030 Agenda, empower and inspire people across the world to achieve the Sustainable Development Goals (SDGs) while generating political will, and help make the Goals attainable by 2030.{'\n\n'}
            The UN SDG Action Campaign is a special initiative of the UN-Secretary General, administered by the UNDP to create awareness about the 2030 Agenda, empower and inspire people across the world to achieve the Sustainable Development Goals (SDGs) while generating political will, and help make the Goals attainable by 2030.The UN SDG Action Campaign is a special initiative of the UN-Secretary General, administered by the UNDP to create awareness about the 2030 Agenda, empower and inspire people across the world to achieve the Sustainable Development Goals (SDGs) while generating political will, and help make the Goals attainable by 2030</Text>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  scroll: {
    flex:1,
    marginTop:10,
  },
  about: {
    fontSize:14,
    textAlign:'justify',
    margin:5,
    padding:5,
  },
})
