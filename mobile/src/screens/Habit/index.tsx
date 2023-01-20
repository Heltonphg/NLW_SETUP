import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import dayjs from 'dayjs'
import { useRoute } from '@react-navigation/native'
import { BackButton } from '../../components/BackButton'
import { CheckBox } from '../../components/CheckBox'
import { ProgressBar } from '../../components/ProgressBar'

interface Params {
  date: string
}

export const Habit: React.FC = () => {
  const route = useRoute()
  const { date } = route.params as Params

  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayOfMonth = parsedDate.format('DD/MM')

  return (
    <View className="flex-1 bg-background px-4 pt-12">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20
        }}>
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">{dayOfWeek}</Text>

        <Text className="text-white font-extrabold text-3xl">{dayOfMonth}</Text>

        <ProgressBar progress={90} />

        <View className="mt-6">
          <CheckBox title="Beber 2l de água" />
          <CheckBox title="Estudar React" />
          <CheckBox title="Caminhada" checked />
        </View>
      </ScrollView>
    </View>
  )
}
