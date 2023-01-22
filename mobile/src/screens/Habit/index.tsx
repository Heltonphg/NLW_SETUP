import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useRoute } from '@react-navigation/native'
import { BackButton } from '../../components/BackButton'
import { CheckBox } from '../../components/CheckBox'
import { HabitEmpty } from '../../components/HabitEmpty'
import { Loading } from '../../components/Loading'
import { ProgressBar } from '../../components/ProgressBar'
import { api } from '../../lib/axios'
import { generateProgressPorcentage } from '../../utils/generete-progress-porcentage'

interface Params {
  date: string
}
interface IDayInfoProps {
  completedHabits: string[]
  possibleHabits: {
    id: string
    title: string
  }[]
}

export const Habit: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [dayInfo, setDayInfo] = useState<IDayInfoProps | null>(null)
  const [completedHabits, setCompletedHabits] = useState<string[]>([])

  const route = useRoute()
  const { date } = route.params as Params

  const parsedDate = dayjs(date)
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date())
  const dayOfWeek = parsedDate.format('dddd')
  const dayOfMonth = parsedDate.format('DD/MM')

  const habitsProgress = dayInfo?.possibleHabits.length
    ? generateProgressPorcentage(dayInfo.possibleHabits.length, completedHabits.length)
    : 0

  async function fetchHabits() {
    try {
      setLoading(true)

      const response = await api.get('/day', {
        params: {
          date
        }
      })

      setDayInfo(response.data)
      setCompletedHabits(response.data.completedHabits)
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Ocorreu um erro ao buscar os hábitos')
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleHabit(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`)
      if (completedHabits.includes(habitId)) {
        setCompletedHabits((prevState) => prevState.filter((id) => id !== habitId))
      } else {
        setCompletedHabits((prevState) => [...prevState, habitId])
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Ocorreu um erro ao atualizar o hábito')
    }
  }

  useEffect(() => {
    fetchHabits()
  }, [])

  if (loading) {
    return <Loading />
  }

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

        <ProgressBar progress={habitsProgress} />

        <View
          className={clsx('mt-6', {
            ['opacity-30']: isDateInPast
          })}>
          {dayInfo?.possibleHabits && dayInfo.possibleHabits.length > 0 ? (
            dayInfo?.possibleHabits.map((habit) => (
              <CheckBox
                key={habit.id}
                title={habit.title}
                checked={completedHabits.includes(habit.id)}
                disabled={isDateInPast}
                onPress={() => handleToggleHabit(habit.id)}
              />
            ))
          ) : (
            <HabitEmpty />
          )}
        </View>
        {isDateInPast && (
          <Text className="text-white mt-10 text-center">
            Você não pode editar hábitos de uma data passada
          </Text>
        )}
      </ScrollView>
    </View>
  )
}
