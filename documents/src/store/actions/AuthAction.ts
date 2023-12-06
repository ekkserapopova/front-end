import axios from 'axios'
import { AppDispatch } from '../store';
import { loginUser } from '../slices/authSlice'; 
// import redirect

export const logIn = (login:string, password:string) => async (dispatch:AppDispatch) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', {
        login,
        password,
      }, {
        withCredentials: true,
      });
  
      dispatch(loginUser({ user: response.data }));
      console.log('Вход выполнен успешно');
      // redirectTo('/front-end');
    } catch (error) {
      console.log('Неверный логин или пароль');
    }
};