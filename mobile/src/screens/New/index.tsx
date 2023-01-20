import React from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'
import { BackButton } from '../../components/BackButton'

export const New: React.FC = () => {
  return (
    <View className="flex-1 bg-background px-4 pt-12">
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">Crair Hábito</Text>

        <Text className="mt-6 text-white font-semibold text-base">Qual seu comprometimento?</Text>

        <TextInput className="h-12 pl-4 rounded-lg mt-4 bg-zinc-800 text-white focus: border-2 focus:border-green-600" />
      </ScrollView>
    </View>
  )
}
