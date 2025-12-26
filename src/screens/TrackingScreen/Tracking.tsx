import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './Header'
import { SafeAreaView } from 'react-native-safe-area-context'
const Tracking = () => {
  return (
    <ScrollView style={{backgroundColor:'#F6F8FC',flex:1}}>
      <Header/>
    </ScrollView>
  )
}

export default Tracking

const styles = StyleSheet.create({})