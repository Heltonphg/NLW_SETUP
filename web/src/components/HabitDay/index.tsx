import React from 'react'
import clsx from 'clsx'
import { Check } from 'phosphor-react'
import * as CheckBox from '@radix-ui/react-checkbox'
import * as Popover from '@radix-ui/react-popover'
import { ProgressBar } from '../ProgressBar'
interface IHabitDayProps {
  completed: number
  amount: number
}

export const HabitDay: React.FC<IHabitDayProps> = ({ amount, completed }) => {
  const completedPorcentege = Math.round((completed / amount) * 100)

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
          <span className="font-semibold text-zinc-400">Terça Feira</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">17/01</span>

          <ProgressBar progress={completedPorcentege} />

          <div className="mt-6 flex flex-col gap-3">
            <CheckBox.Root className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                <CheckBox.Indicator>
                  <Check size={20} className="text-white" />
                </CheckBox.Indicator>
              </div>

              <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                Beber 2l de água
              </span>
            </CheckBox.Root>
          </div>
          <Popover.Arrow className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
