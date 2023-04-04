import { User } from './User'

export type UserData = Omit<User, 'password'>
