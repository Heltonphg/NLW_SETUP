import React, { useState } from 'react'
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'
import { BackButton } from '../../components/BackButton'
import { CheckBox } from '../../components/CheckBox'
import { api } from '../../lib/axios'
const availableWeekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export const New: React.FC = () => {
  const [title, setTitle] = useState<string>('')
  const [weekDays, setWeekDays] = useState<number[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) => prevState.filter((weekDay) => weekDay !== weekDayIndex))
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex])
    }
  }

  async function handleCreateHabit() {
    try {
      setLoading(true)
      if (!title || weekDays.length === 0) {
        Alert.alert('Novo Hábito', 'Informe o título e a recorrência do hábito')
        return
      }
      await api.post('/habits', {
        title,
        weekDays
      })

      setTitle('')
      setWeekDays([])
      Alert.alert('Novo Hábito', 'Hábito criado com sucesso!')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-background px-4 pt-12">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 24
        }}>
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">Crair Hábito</Text>

        <Text className="mt-6  text-white font-semibold text-base">Qual seu comprometimento?</Text>

        <TextInput
          placeholder="Exercíocios, dormir bem"
          placeholderTextColor={colors.gray[400]}
          className="h-12 pl-4 rounded-lg mt-4 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
          onChangeText={setTitle}
          value={title}
        />

        <Text className="mt-4 mb-4 text-white font-semibold text-base">Qual a recorrência?</Text>

        {availableWeekDays.map((day, index) => (
          <CheckBox
            key={`${day}-${index}`}
            title={day}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}

        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-8"
          activeOpacity={0.7}
          onPress={handleCreateHabit}>
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-semibold text-base text-white ml-2">Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
