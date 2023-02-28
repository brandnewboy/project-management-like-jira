import styled from '@emotion/styled'
import { Rate, Select, Typography } from 'antd'
import React, { FC } from 'react'
import useUsers from 'utils/user'
import Utils from '../utils'

interface RowComponentProps {
  gap?: number | string
  between?: boolean
  marginBottom?: number
}

interface FullPageErrorRenderProps {
  error: Error | null
}

export const Row = styled.div<RowComponentProps>`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.between ? 'space-between' : undefined)};
  margin-bottom: ${props =>
    props.marginBottom ? props.marginBottom + 'rem' : undefined};

  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props =>
      (typeof props.gap === 'number' ? props.gap + 'rem' : props.gap) ||
      undefined};
  }
`

const FullPageContainer = styled(Row)`
  height: 100vh;
  width: 100vw;
  justify-content: center;
`
export const FullPageErrorRender: FC<FullPageErrorRenderProps> = ({
  error
}) => {
  return (
    <FullPageContainer>
      <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
    </FullPageContainer>
  )
}

/**
 * 自定义选择器 根据 id
 */
type SelectProps = React.ComponentProps<typeof Select>
export interface IdSelectProps
  extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value?: string | number | null | undefined
  onChange?: (value?: number) => void
  defaultOptionName?: string
  options: { name: string; id: number }[]
}

export const IdSelect: FC<IdSelectProps> = props => {
  const { value, defaultOptionName, options, onChange, ...restProps } = props

  return (
    <Select
      {...restProps}
      value={Utils.toNumber(value)}
      onChange={value => onChange?.(Utils.toNumber(value) || undefined)}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options.map(item => {
        return (
          <Select.Option value={item.id} key={item.id}>
            {item.name}
          </Select.Option>
        )
      })}
    </Select>
  )
}

type UserSelectProps = Omit<IdSelectProps, 'options'>
export const UserSelect: FC<UserSelectProps> = props => {
  const { data: users } = useUsers()
  return <IdSelect options={users || []} {...props}></IdSelect>
}

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const Pin: FC<PinProps> = ({ checked, onCheckedChange, ...rest }) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={num => onCheckedChange?.(!!num)}
      {...rest}
    />
  )
}

export const ErrorBox: FC<{ error: any }> = ({ error }) => {
  if (Utils.isError(error))
    return <Typography.Text type={'danger'}>{error.message}</Typography.Text>
  else return null
}
