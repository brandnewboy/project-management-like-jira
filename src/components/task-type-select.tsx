import React, { FC } from 'react'
import { useTaskTypes } from 'utils/task-type'
import { IdSelect, IdSelectProps } from './lib'

type TaskTypesSelectProps = Omit<IdSelectProps, 'options'>
export const TaskTypeSelect: FC<TaskTypesSelectProps> = props => {
  const { data: taskTypes } = useTaskTypes()
  return <IdSelect options={taskTypes || []} {...props}></IdSelect>
}
