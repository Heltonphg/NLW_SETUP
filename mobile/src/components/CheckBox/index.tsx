import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import clsx from 'clsx'
import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'

interface ICheckBoxProps extends TouchableOpacityProps {
  title: string
  checked?: boolean
}

export const CheckBox: React.FC<ICheckBoxProps> = ({ checked = false, title, ...rest }) => {
  return (
    <TouchableOpacity className="flex-row mb-2 items-center" {...rest}>
      <View
        className={clsx('h-8 w-8 bg-green-500 rounded-lg items-center justify-center', {
          'bg-zinc-900 rounded-lg': !checked
        })}>
        {checked && <Feather name="check" size={20} color={colors.white} />}
      </View>

      <Text className="text-white text-base ml-3 font-semibold">{title}</Text>
    </TouchableOpacity>
  )
}
