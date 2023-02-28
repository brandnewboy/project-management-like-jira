import React, { FC } from 'react'

export const Mark: FC<{
  text: string
  keyword: string
  color?: string
}> = ({ text, keyword, color }) => {
  const textArr = text.split('')

  if (!keyword) return <>{text}</>

  return (
    <>
      {/* {textArr.map((word, index) => (
        <span key={index}>
          {word}
          {index === word.length - 1 ? null : (
            <span style={{ color: color || '#FF9640' }}>{keyword}</span>
          )}
        </span>
      ))} */}
      {textArr.map((word, index) => (
        <span
          style={{
            color: keyword.includes(word) ? color || '#FF9640' : 'none'
          }}
          key={index}
        >
          {word}
        </span>
      ))}
    </>
  )
}
