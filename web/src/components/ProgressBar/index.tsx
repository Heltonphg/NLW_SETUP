import React from 'react'

interface IProgressBarProps {
  progress: number
}

export const ProgressBar: React.FC<IProgressBarProps> = ({ progress }) => {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        role={'progressbar'}
        aria-label={'Progresso de hábitos completados nesse dia'}
        aria-valuenow={progress}
        className="h-3 rounded-xl bg-violet-600 "
        style={{ width: `${progress}%` }}></div>
    </div>
  )
}
