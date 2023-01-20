import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Logo from '../../assets/logo.svg'

export const Header: React.FC = () => {
  const { navigate } = useNavigation()

  return (
    <View className="w-full flex-row justify-between">
      <Logo />

      <TouchableOpacity
        className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center"
        activeOpacity={0.7}
        onPress={() => navigate('new')}>
        <Feather name="plus" color={colors.violet[500]} size={20} />
        <Text className="text-white ml-3 font-semibold text-base">Novo</Text>
      </TouchableOpacity>
    </View>
  )
}
