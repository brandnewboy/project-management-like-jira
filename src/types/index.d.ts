export interface ProjectProps {
  id: number
  name: string
  personId: number
  organization: string
  created: number
  pin: boolean
}

export interface UserProps {
  id: number
  name: string
  token: string
}

export interface LoginFormProps {
  username: string
  password: string
  token?: string
}

export interface ListProps {
  list: Project[]
  users: User[]
}

export interface AuthContextProps {
  user: LoginFormProps | null
  login: (form: LoginFormProps) => void
  register: (form: LoginFormProps) => void
  logout: () => void
}

export type DateFormatProps = 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss'
