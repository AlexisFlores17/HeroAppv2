
import { AuthReducer } from '../../../src/auth/context/AuthReducer';
import { types } from '../../../src/auth/types/types';


describe('Pruebas en AuthReducer', () => { 

    const initialState = {
        logged: false,
        user: null
    }

    test('Debe retornar el estado por defecto', () => { 
        const state = AuthReducer(initialState, { type: '' });

        expect(state).toEqual(initialState);
     })
     

     test('debe de (login) llamar el login de autenticar  y establecer el user', () => { 
        const action={
            type: types.login,
            payload:{
                id: '123',
                name: 'Fernando'
            }
        }

        const state = AuthReducer(initialState, action);

        expect(state).toEqual({
            logged: true,
            user: action.payload
        });
      })

      test('debe de (logout) llamar el logout de autenticar  y borrar todo', () => { 

        const stateLogin ={
            logged: true,
            user: {
                id: '123',
                name: 'Fernando'
            }
        }
        const action={
            type: types.logout
        }

        const state = AuthReducer(stateLogin, action);

        expect(state).toEqual({
            logged: false
        });
       })
    })