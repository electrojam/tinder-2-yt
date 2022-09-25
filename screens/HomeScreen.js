import React from 'react'
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons"
import Swiper from "react-native-deck-swiper"

const DUMMY_DATA = [
  {
    firstName: "Petro",
    lastName: "Petrosky",
    job: "Software Developer",
    photoURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Presidente_Gustavo_Petro_Urrego.jpg/220px-Presidente_Gustavo_Petro_Urrego.jpg",
    age: 27,
    id: 789,
  },
  {
    firstName: "Elon",
    lastName: "Sangha",
    job: "Software Developer",
    photoURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/220px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
    age: 27,
    id: 456,
  },
  {
    firstName: "Sonny",
    lastName: "Musk",
    job: "Software Developer",
    photoURL: "https://avatars.githubusercontent.com/u/24712956?v=4",
    age: 27,
    id: 123,
  }
]

const HomeScreen = () => {
  const navigation = useNavigation()
  const { user, logout } = useAuth()
  
  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex-row items-center justify-between px-5`}>
        <TouchableOpacity onPress={logout}>
          <Image 
            style={tw`h-10 w-10 rounded-full`} 
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image 
            style={tw`h-14 w-14`}
            source={{ uri: "https://www.tinderpressroom.com/image/flame-gradient-RGB_tn1100-category.png" }}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name='chatbubbles-sharp' size={30} color="#FF5864"/>
        </TouchableOpacity>
      </View>

      <View style={tw`flex-1 -mt-6`}>
        <Swiper  
        containerStyle={{ backgroundColor: "transparent" }}
          cards={DUMMY_DATA}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          renderCard={(card) => (
            <View key={card.id} style={tw`relative bg-white h-3/4 rounded-xl`}>
              <Image 
                style={tw`absolute top-0 h-full w-full rounded-xl`} 
                source={{ uri: card.photoURL }}
              />
              
              <View 
                style={[tw
                  `absolute bottom-0 bg-white w-full flex-row justify-between 
                  h-20 px-6 py-2 rounded-b-xl`, 
                  styles.cardShadow,
                ]}
              >
                <View>
                  <Text style={tw`text-xl font-bold`}>{card.firstName} {card.lastName}</Text>
                  <Text>{card.job}</Text>
                </View>
                <Text style={tw`text-2xl font-bold`}>{card.age}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    sahdowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  }
})