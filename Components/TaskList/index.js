import React, { useState } from 'react'

import { Text, View,Button, StyleSheet, Image ,TouchableOpacity} from 'react-native'

import { CheckBox } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';


export default function TaskList(props) {
  const {eachItem,removeHandleTask,taskDone} = props 
  const {id,taskName,date,done} = eachItem
   
  const removeTask = () => {
    removeHandleTask(id)
  }

  const handleCheck = () => {
    taskDone(id)
  }

  return (
    <View style={styles.listContainer}>
        <CheckBox
        checked={done}
        onPress={handleCheck}
      />
        <Text style={done?styles.completedTask:styles.taskText}>{taskName}</Text>
        <TouchableOpacity  onPress={removeTask}>
        <Image source={require('../../assets/delete.png')}  style={{ width: 30, height: 30 }}/>
        </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
    listContainer: {
      marginTop:10,
        marginBottom:20,
        borderColor: 'Black',
        padding: 10,
        borderWidth: 2,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:10,
        alignItems:'center',
        flexWrap:'wrap'
    },
    completedTask: {
        color:'green',
        fontSize:20,
        textDecorationLine:'line-through',
        borderColor:'green',
    },
    taskText:{
        fontSize:20,
        
    }

})
