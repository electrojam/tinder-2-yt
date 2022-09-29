import { useNavigation } from '@react-navigation/native'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { db } from '../firebase'
import useAuth from '../hooks/useAuth'

const ModalScreen = () => {
  const { user } = useAuth()
  const [image, setImage] = useState(null)
  const [job, setJob] = useState(null)
  const [age, setAge] = useState(null)
  const navigation = useNavigation()

  const incompleteForm = !image || !job || !age

  const updateUserProfile = () => {
    setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job: job,
      age: age,
      timestamp: serverTimestamp()
    })
      .then(() => {
        navigation.navigate('Home')
      })
      .catch((error) => {
        alert(error.message)
      })
  }
  
  return (
    <SafeAreaView style={tw`flex-1 items-center`}>
      <Image 
        source={{ uri: "https://1000marcas.net/wp-content/uploads/2019/12/logo-Tinder.png" }}
        resizeMode="contain"
        style={tw`h-20 w-full`} 
      />
      <Text style={tw`text-xl text-gray-500 font-bold`}>
        Hola {user.displayName}
      </Text>
      <Text style={tw`text-center p-4 font-bold text-red-400`}>
        Paso 1: Foto de perfil
      </Text>
      <TextInput 
        value={image}
        onChangeText={setImage}
        style={tw`text-center text-xl pb-2`} 
        placeholder="Ingrese una foto de perfil"
      />

      <Text style={tw`text-center p-4 font-bold text-red-400`}>
        Paso 2: Ocupación
      </Text>
      <TextInput 
        value={job}
        onChangeText={setJob}
        style={tw`text-center text-xl pb-2`} 
        placeholder="Ingrese su ocupación"
      />

      <Text style={tw`text-center p-4 font-bold text-red-400`}>
        Paso 3: Edad
      </Text>
      <TextInput 
        value={age}
        onChangeText={setAge}
        style={tw`text-center text-xl pb-2`} 
        placeholder="Ingrese su edad"
        keyboardType='numeric'
        maxLength={2}
      />

      <TouchableOpacity 
        disabled={incompleteForm}
        style={[
          tw`flex-1 w-64 p-3 rounded-xl absolute bottom-10`,
          incompleteForm ? tw`bg-gray-400` : tw`bg-red-400`
        ]}
        onPress={updateUserProfile}
      >
        <Text style={tw`text-center text-white text-xl`}>Actualizar Perfil</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default ModalScreen