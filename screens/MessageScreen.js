import { useRoute } from '@react-navigation/native'
import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'

const MessageScreen = () => {
  const { user } = useAuth()
  const { params } = useRoute()

  const { matchDetails } = params

  return (
    <SafeAreaView>
      <Header 
        title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName}
        callEnabled 
      />
      <Text>Message Screen</Text>
    </SafeAreaView>
  )
}

export default MessageScreen