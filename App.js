import React ,{ useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons} from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
 } from 'react-native';


export default function App() {
  
  const Filters = function(props){
    return (
        <View style={styles.fcontainer}>
        <TouchableOpacity style= {styles.btn} onPress={()=>props.modeHandler('all')}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style= {styles.btn} onPress={()=>props.modeHandler('active')}>
          <Text>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity style= {styles.btn} onPress={()=>props.modeHandler('done')}>
          <Text>Completed</Text>
        </TouchableOpacity>
        </View>
    )

}
const [ todoList , settodoList] = useState([]);
  const [ mode , setMode ] = useState('all')
  let todo = []

const Form = function(props){
  const [input , setInput] = useState('');

  
  return (
    <View style={styles.inputContainer}>
        <TextInput style= {styles.Textinput}
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity onPress={()=> props.submitHandler(input)}>
          <Ionicons size={30} name='ios-add' color='white'/>
      </TouchableOpacity>
    </View>
  )

}

  if (mode == 'all'){
    todo = todoList
  }else if(mode == 'active'){
    todo = todoList.filter(item => item.is_active == true)
  }else{
    todo = todoList.filter(item => item.is_active == false)
  }
  
  const submitHandler = (text)=> {
    const key = todoList.length ? todoList.length+1 : 1;
    settodoList((list)=>{
      return [
        {text:text, key: key , is_active: true},...list
      ]})
    }


  const clickHandler = (key)=>{
    settodoList((list)=>{
      return list.map((item)=>{
        if(item.key == key){
          item.is_active = !item.is_active
        }
        return item
      })
    })
  }

  const modeHandler = (mode)=>{
    setMode((mod)=> mod = mode)
  }

  return (
    <View style={styles.container}>
        <Text style={ styles.header}>Baby Shark</Text>
        <Text style={styles.text}>TODO-dododoooooo</Text>
        <Form submitHandler={submitHandler}/>
        <Filters  modeHandler ={modeHandler}/>
        
        <FlatList
        data={todo}
        keyExtractor={item =>item.key}
        renderItem={({item})=>
          <TouchableOpacity onPress={()=>clickHandler(item.key) }>
             <View style={{flexDirection:'row'}}>
              <MaterialIcons size={25} name= {item.is_active == true?  'check-box-outline-blank' : 'check-box' }  color='white'/>
            <Text style={item.is_active == true? styles.text : styles.textline }>{item.text}</Text>
            </View>
          </TouchableOpacity>
        }
        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:'10px',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
    color: 'orange',
  },
  text: {
    fontSize:20,
    color: 'white',
    margin: 3

  },
  textline: {
    fontSize: 20,
    color: 'orange',
    textDecorationLine: 'line-through'

  },
  fcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
      color: 'orange',
      backgroundColor: 'white',
      margin: 8,
      padding:18,
      width:75,
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
     
    Textinput: {
       height: 30,
       width: 200,
       backgroundColor: 'orange',
       borderRadius: 8,
       margin:5,
       padding: 5 
      },
  
 
});