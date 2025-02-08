import { render, screen } from "@testing-library/react";
import React from "react";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router";
import { AuthContext } from "../../src/auth";

describe("Pruebas en AppRouter", () => {
  test("Debe mostrar el login si no esta autenticado", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/marvel"]}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );


    expect(screen.getAllByText("Remember me").length).toBe(1);
  });

  test('Debe mostrar el componente de marvel si esta autenticado', () => { 
    const contextValue = {
        logged: true,
        user:{
            id: "123",
            name: "Alexis"
        }
      };
  
      render(
        <AuthContext.Provider value={contextValue}>
          <MemoryRouter initialEntries={["/login"]}>
            <AppRouter />
          </MemoryRouter>
        </AuthContext.Provider>
      );
  
  
      expect(screen.getAllByText("Marvel").length).toBeGreaterThanOrEqual(1);
   })
});
