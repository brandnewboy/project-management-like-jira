import React from 'react'
import { useArray } from 'utils'

interface Person {
  name: string
  id: string
}

export default function TsReactTest() {
  const { value, add, removeByIndex, clear } = useArray<Person>([
    {
      name: '张三',
      id: '001'
    },
    {
      name: '李四',
      id: '002'
    }
  ])

  const jhon: Person = {
    name: 'jhon',
    id: String(Date.now() + Math.random())
  }

  // useMount(() => {
  //   add('45')
  //   removeByIndex('456')
  // })

  return (
    <div>
      <header>
        <button onClick={() => add(jhon)}>添加一个信息</button>
        <button onClick={() => removeByIndex(0)}>删除第一项</button>
        <button onClick={() => clear()}>清空列表</button>
      </header>
      <main>
        <ul>
          {value.map((person, index) => (
            <li key={person.id}>
              {index}---{person.id}---{person.name}
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
