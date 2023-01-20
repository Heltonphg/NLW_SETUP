import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import dayjs from 'dayjs'
import { useNavigation } from '@react-navigation/native'
import { DAY_SIZE, HabitDay } from '../../components/HabitDay'
import { Header } from '../../components/Header'
import { Loading } from '../../components/Loading'
import { api } from '../../lib/axios'
import { generateRangeDatesFromYearStart } from '../../utils/generate-range-between-dates'
const WeekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateRangeDatesFromYearStart()
const minimumSummaryDatesSizes = 18 * 5
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length

type Summary = { amount: number; completed: number; date: string; id: string }[]

export const Home: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<Summary>([] as Summary)

  const { navigate } = useNavigation()

  async function fatchData() {
    try {
      setLoading(true)
      const { data } = await api.get('summary')
      setSummary(data)
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Ocorreu um erro ao buscar os dados')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fatchData()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />
      <View className="flex-row mt-6 mb-2">
        {WeekDays.map((day, index) => (
          <Text
            key={`${day}-${index}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{
              width: DAY_SIZE
            }}>
            {day}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20
        }}>
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date) => {
            const dayWithHabits = summary.find((day) => dayjs(date).isSame(day.date, 'day'))

            return (
              <HabitDay
                key={date.toISOString()}
                date={date}
                amountOfHabits={dayWithHabits?.amount}
                amountCompleted={dayWithHabits?.completed}
                onPress={() =>
                  navigate('habit', {
                    date: date.toISOString()
                  })
                }
              />
            )
          })}

          {amountOfDaysToFill > 0 &&
            Array.from({
              length: amountOfDaysToFill
            }).map((_, index) => (
              <View
                key={index}
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                style={{
                  width: DAY_SIZE,
                  height: DAY_SIZE
                }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  )
}
