import { ReactNode, useContext } from 'react';
import { AuthContext } from '../auth';
import { Navigate } from 'react-router';

interface Props {
  children: ReactNode;
}

export const PublicRoute = ({ children }: Props) => {

    const {logged}= useContext(AuthContext);



  return (!logged ? children : <Navigate to="/" />);
}
