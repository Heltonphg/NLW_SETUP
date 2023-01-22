import React, { FormEvent, useState } from 'react'
import { Check } from 'phosphor-react'
import * as CheckBox from '@radix-ui/react-checkbox'
import { api } from '../../lib/axios'

const availableWeekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export const NewHabitForm: React.FC = () => {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  async function createNewHabit(event: FormEvent) {
    event.preventDefault()
    if (!title || weekDays.length === 0) {
      return
    }
    await api.post('/habits', {
      title,
      weekDays
    })

    setTitle('')
    setWeekDays([])
    alert('Hábito criado com sucesso!')
  }

  function handleToggleWeekDay(shouldAddToList: boolean, weekDayIndex: number) {
    setWeekDays((prevWeekDays) => {
      if (shouldAddToList) {
        return [...prevWeekDays, weekDayIndex]
      } else {
        return prevWeekDays.filter((weekDay) => weekDay !== weekDayIndex)
      }
    })
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder='Ex: "Estudar React"'
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-off"
        autoFocus
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />

      <label htmlFor="title" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="mt-3 flex flex-col gap-2">
        {availableWeekDays.map((weekDay, index) => (
          <CheckBox.Root
            key={weekDay}
            className="flex items-center gap-3 group focus:outline-none"
            checked={weekDays.includes(index)}
            onCheckedChange={(checked) => handleToggleWeekDay(!!checked, index)}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-500 group-focus:ring-off">
              <CheckBox.Indicator>
                <Check size={20} className="text-white" />
              </CheckBox.Indicator>
            </div>

            <span className=" text-white leading-tight">{weekDay}</span>
          </CheckBox.Root>
        ))}
      </div>

      <button className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-zinc-900  ">
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}
