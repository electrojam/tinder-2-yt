import { useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, TextInput, Button, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import tw from 'twrnc'

const MessageScreen = () => {
  const { user } = useAuth()
  const { params } = useRoute()
  const [input, setInput] = useState("")

  const { matchDetails } = params

  const sendMessage = () => {

  }

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Header 
        title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName}
        callEnabled 
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}  
        style={tw`flex-1`}    
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
            <Text>Prueba</Text>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View 
        style={
          tw`flex-row justify-between items-center bg-white
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
  )
}

export default MessageScreen