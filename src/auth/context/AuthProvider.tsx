import { AuthContext } from "./AuthContext";

import { ReactNode, useReducer } from 'react';
import { AuthReducer } from "./AuthReducer";
import { types } from "../types/types";

interface AuthProviderProps {
  children: ReactNode;
}

// const initialState = {
//     logged: false
// };

const init = () => {

   const user = JSON.parse(localStorage.getItem('user') || 'null');
   
   return{
    logged: !!user,
    user
   }


  }


export const AuthProvider = ({ children }: AuthProviderProps) => {

  const [state, dispatch] = useReducer(AuthReducer, {}, init );

  const login = async (name="") => {

    const user = { id: "123", name: name };
    const action = {
        type: types.login,
        payload: user
    }
    dispatch(action);

    localStorage.setItem('user', JSON.stringify(user));

  }

  const logout = async() =>{
    localStorage.removeItem('user');
    const action ={
      type: types.logout
    }

    dispatch(action);

  }



  return <AuthContext.Provider value={{...state,login, logout}}>{children}</AuthContext.Provider>;
};
