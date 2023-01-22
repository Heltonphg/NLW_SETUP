import React from 'react'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const HabitEmpty: React.FC = () => {
  const { navigate } = useNavigation()
  return (
    <Text className="text-zinc-400 text-base">
      Você ainda não está monitorando nenhum hábito{' '}
      <Text
        className="text-violet-400 text-base underline active:text-violet-500"
        onPress={() => navigate('new')}>
        começe cadastrando um agora
      </Text>
    </Text>
  )
}
