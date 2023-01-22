import React from 'react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import * as Popover from '@radix-ui/react-popover'
import { HabitsList } from '../HabitsList'
import { ProgressBar } from '../ProgressBar'

interface IHabitDayProps {
  date: Date
  defaultCompleted?: number
  amount?: number
}

export const HabitDay: React.FC<IHabitDayProps> = ({ amount = 0, defaultCompleted = 0, date }) => {
  const [completed, setCompleted] = React.useState(defaultCompleted)
  const completedPorcentege = amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMount = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')

  function handleCompletedChange(completed: number) {
    setCompleted(completed)
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx('w-10 h-10 border-2 rounded-lg', {
          'bg-zinc-900 border-zinc-800': completedPorcentege === 0,
          'bg-violet-900 border-violet-700': completedPorcentege > 0 && completedPorcentege < 20,
          'bg-violet-800 border-violet-600': completedPorcentege >= 20 && completedPorcentege < 40,
          'bg-violet-700 border-violet-500': completedPorcentege >= 40 && completedPorcentege < 60,
          'bg-violet-600 border-violet-500': completedPorcentege >= 60 && completedPorcentege < 80,
          'bg-violet-500 border-violet-400': completedPorcentege >= 80
        })}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMount}</span>
          <ProgressBar progress={completedPorcentege} />

          <HabitsList date={date} onCompletedChange={handleCompletedChange} />
          <Popover.Arrow className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
