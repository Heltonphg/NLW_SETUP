import React, { useState } from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'
import { BackButton } from '../../components/BackButton'
import { CheckBox } from '../../components/CheckBox'
const availableWeekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export const New: React.FC = () => {
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) => prevState.filter((weekDay) => weekDay !== weekDayIndex))
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex])
    }
  }

  return (
    <View className="flex-1 bg-background px-4 pt-12">
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">Crair Hábito</Text>

        <Text className="mt-6  text-white font-semibold text-base">Qual seu comprometimento?</Text>

        <TextInput className="h-12 pl-4 rounded-lg mt-4 bg-zinc-800 text-white focus: border-2 border-zinc-900 focus:border-green-600" />

        <Text className="mt-4 mb-4 text-white font-semibold text-base">Qual a recorrência?</Text>

        {availableWeekDays.map((day, index) => (
          <CheckBox
            key={`${day}-${index}`}
            title={day}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}
      </ScrollView>
    </View>
  )
}
