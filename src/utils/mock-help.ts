import { useState } from 'react'
import useUsers from './user'

export const usePersonId = () => {
  const { data: users } = useUsers()
  const [personId, setpersonId] = useState(1)

  const generate = () => {
    const index = Number((Math.random() * 10).toFixed(0))
    const id = users ? users[index].id : 1
    setpersonId(id)
  }

  return [personId, generate] as const
}

export const useTaskTypeId = () => {
  const [personId] = usePersonId()
  return personId % 2 === 0 ? 2 : 1
}

export const useRandomId = () => {
  const index = Number((Math.random() * 10).toFixed(0))
  const [pId] = usePersonId()
  const tId = useTaskTypeId()
  return index + pId + tId
}
