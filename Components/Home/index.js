import React, { useState } from 'react'
import { View,SafeAreaView, StyleSheet, TextInput,Alert} from 'react-native'
import { Button ,Text} from 'react-native-elements';

import TaskList from '../TaskList'
import { ScrollView } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import LinearGradient from 'react-native-linear-gradient';
import { StatusBar } from 'expo-status-bar';




export default function Home() {
   
   const [name,setName] = useState('')
   const [task,setTask] = useState([])  

   

   const handleText = async () => {
    const newTask = {
      id: Math.random(),
      taskName: name,
      date: new Date().getDate(),
      done: false,
    };
  
    try {
      const savedTasks = [...task, newTask];
      await AsyncStorage.setItem('tasks', JSON.stringify(savedTasks));
      setTask(savedTasks);
      setName('');
    } catch (error) {
      console.log(error);
    }
  };
  

  const removeHandleTask = async (id) => {
    try {
      const filteredTask = task.filter((eachItem) => eachItem.id !== id);
      await AsyncStorage.setItem('tasks', JSON.stringify(filteredTask));
      setTask(filteredTask);
    } catch (error) {
      console.log(error);
    }
  };
  

  const checkedTask = async (id) => {
    const updatedTasks = task.map((taskItem) => {
      if (taskItem.id === id) {
        return { ...taskItem, done: !taskItem.done };
      } else {
        return taskItem;
      }
    });
  
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTask(updatedTasks);
  
      setTimeout(() => {
        const filteredTask = task.filter((eachItem) => eachItem.id !== id);
        AsyncStorage.setItem('tasks', JSON.stringify(filteredTask));
        setTask(filteredTask);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleRemoveAllTasks = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to remove all tasks?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('tasks');
              setTask([]);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };
  


  return (
   
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#fff'/>
        <Text style={styles.heading}>Todo List</Text>
        <View style={styles.viewContainer} >
        <TextInput style={{
    borderWidth: 2,
    borderColor: 'black',
    fontFamily: 'monospace',
    borderRadius: 10,
    padding: 10,
    marginBottom:20,
    width:'100%',
    fontSize:20,
  }} placeholder='What is your task today...' value={name} onChangeText={(text)=>setName(text)} />
  <Button title='Add' onPress={handleText} buttonStyle={styles.addButton}/>
  <Button title='Remove All Task' onPress={handleRemoveAllTasks} buttonStyle={styles.removeBtn}/>
  </View>
  {task.length !==0 ? <ScrollView>
  {task.map(eachItem=> 
    <TaskList key={eachItem.id} eachItem={eachItem} removeHandleTask={removeHandleTask} taskDone={checkedTask}/>)}
  </ScrollView> :
  <Text style={{textAlign:'center'}}>No Task...</Text>}
    </SafeAreaView>
   
  )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        alignContent: 'center',
        padding:20,
    },
    viewContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        flexWrap:'wrap',
    },
    heading: {
        fontSize: 30,
        fontFamily:'monospace',
        textAlign:'center',
    },
    textInput: {
        border: 1,
        borderColor: 'black',
    },
    addButton:{
        borderRadius:10,
        backgroundColor:'green',
        fontFamily:'monospace'
    },
    removeBtn: {
        borderRadius:10,
        backgroundColor:'red',
    }

})