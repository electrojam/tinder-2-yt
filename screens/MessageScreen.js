import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import tw from 'twrnc'
import SenderMessage from '../components/SenderMessage'
import ReceiverMessage from '../components/ReceiverMessage'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const MessageScreen = () => {
  const { user } = useAuth()
  const { params } = useRoute()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])

  const { matchDetails } = params

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'matches', matchDetails.id, 'messages'), 
        orderBy('timestamp', 'desc')
      ), snapshot => setMessages(snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        )
    )
  }, [matchDetails, db])
  

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displaName: user.displayName,
      photoURL: matchDetails.users[user.uid].photoURL,
      message: input,
    })

    setInput("")
  }

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}  
      style={tw`flex-1`}    
      keyboardVerticalOffset={10}
    >
      <SafeAreaView style={tw`flex-1`}>
        <Header 
          title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName}
          callEnabled 
        />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList 
            inverted={-1}
              data={messages}
              style={tw`pl-4`}
              keyExtractor={item => item.id}
              renderItem={({ item: message }) => 
                message.userId === user.uid ? (
                  <SenderMessage key={message.id} message={message}/>
                ) : (
                  <ReceiverMessage key={message.id} message={message}/>
                )
              }
            />
          </TouchableWithoutFeedback>

          <View 
            style={
              tw`flex-row justify-between items-center 
                  border-t border-gray-200 px-5 py-2`
            }
          > 
            <TextInput
              style={tw`h-10 text-lg`}
              placeholder="Enviar Mensage..."
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
              value={input}
            />
            <Button onPress={sendMessage} title="Enviar" color="#FF5864"/>
          </View>

      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default MessageScreen