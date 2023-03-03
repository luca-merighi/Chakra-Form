import {useContext} from 'react'
import AuthContext from '../contet/AuthContext'

const useAuth = () => useContext(AuthContext)
export default useAuth