import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import { Check } from 'phosphor-react'
import * as CheckBox from '@radix-ui/react-checkbox'
import { api } from '../../lib/axios'

interface IHabitsListProps {
  date: Date
  onCompletedChange: (completed: number) => void
}

interface IHabitsInfo {
  possibleHabits: {
    id: string
    title: string
    created_at: string
  }[]
  completedHabits: string[]
}

export const HabitsList: React.FC<IHabitsListProps> = ({ date, onCompletedChange }) => {
  const [habitsInfo, setHabitsInfo] = React.useState<IHabitsInfo>()

  useEffect(() => {
    api
      .get('/day', {
        params: {
          date: date.toISOString()
        }
      })
      .then((response) => {
        setHabitsInfo(response.data)
      })
  }, [])

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`)
    const ishabitAlreadyCompleted = habitsInfo?.completedHabits.includes(habitId)

    let completedHabits: string[] = []

    if (ishabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter((id) => id !== habitId)
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits
    })
    onCompletedChange(completedHabits.length)
  }

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map((habit) => (
        <CheckBox.Root
          key={habit.id}
          onCheckedChange={() => handleToggleHabit(habit.id)}
          checked={habitsInfo.completedHabits.includes(habit.id)}
          disabled={isDateInPast}
          className="flex items-center gap-3 group focus:ouline-none disabled:cursor-not-allowed">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-500 group-focus:ring-off">
            <CheckBox.Indicator>
              <Check size={20} className="text-white" />
            </CheckBox.Indicator>
          </div>

          <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
            {habit.title}
          </span>
        </CheckBox.Root>
      ))}
    </div>
  )
}
