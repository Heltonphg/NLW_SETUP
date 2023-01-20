import React from 'react'
import { Check } from 'phosphor-react'

export const NewHabitForm: React.FC = () => {
  return (
    <form className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder='Ex: "Estudar React"'
        className="
      p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
      />
      <label htmlFor="title" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>
      <button className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500">
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}
