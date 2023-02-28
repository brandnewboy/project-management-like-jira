import React, { FC } from 'react'
import { useTaskTypes } from 'utils/task-type'

/**
 * SyntaxError: unknown: Namespace tags are not supported by default
 *
 *
 * In the SVG file, try changing:
 *  sketch:type TO sketchType
 *  xmlns:xlink TO xmlnsXlink
 *  xlink:href  TO xlinkHref
 *  etc...
 *  The idea is to create camelCase property, remember that you are working with JSX, you are not creating a string as XML does.
 *
 *  https://www.querythreads.com/syntax-error-unknown-namespace-tags-are-not-supported-by-default/
 */
import { ReactComponent as BugIcon } from 'assets/bug.svg'
import { ReactComponent as TaskIcon } from 'assets/task.svg'

export const TaskTypeIcon: FC<{
  id: number
}> = ({ id }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find(type => type.id === id)?.name
  if (!name) return null

  return name === 'bug' ? <BugIcon /> : <TaskIcon />
}
