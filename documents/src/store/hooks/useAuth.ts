import {useDispatch, useSelector} from 'react-redux';
import {useSession} from './useSession'
import { loginUser, logoutUser } from '../slices/authSlice';
import axios from 'axios';

export function useAuth(){
    const dispatch = useDispatch()
    const { session_id, setSessionId, resetSessionId } = useSession()
    const { is_authenticated, is_moderator, user_id } = useSelector(state => state.user)

    const setUser = (value: any) => {
        dispatch(loginUser(value))
    }

    const resetUser = () => {
        dispatch(logoutUser())
    }

    const logIn = async(formData:any) => {
        const response = await axios(`http://127.0.0.1:8000/login/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            data: formData as FormData
        })
        if (response.status == 201) {

            console.log(response.data)
    
            setSessionId(response.data['session_id'])
    
    
            const data = {
              is_authenticated: true,
              is_moderator: response.data["is_moderator"],
              user_id: response.data["user_id"]
          }
          console.log(`Добро пожаловать, ${response.data["user_id"]}!`)

        setUser(data)

            return true
        }

        return false
    }

    const logOut = async() =>{
        try {

            console.log(session_id)
      
            const response = await axios(`http://localhost:8000/logout/`, {
              method: "POST",
              headers: {
                'session_id': session_id
              }
            })
      
            console.log(response.status)
      
            if (response.status == 200)
            {
              resetSessionId()
              resetUser()
            }
      
          } catch (error) {
            console.log("Что-то пошло не так")
          }
    }
    return {
        is_authenticated,
        is_moderator,
        user_id,
        setUser,
        logOut,
        logIn
      };
}
