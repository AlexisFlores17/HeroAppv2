import React from "react";
import { render, screen } from "@testing-library/react";
import { PublicRoute } from "../../src/router/PublicRoute";
import { AuthContext } from "../../src/auth";
import { MemoryRouter, Route, Routes } from "react-router";

describe("Pruebas en PublicRoute", () => {
  test("Debe mostrar el children si no esta autenticado", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Hola Mundo</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Hola Mundo")).toBeTruthy();
  });

  test("Debe navegar si esta autenticado", () => {
    const contextValue = {
      logged: true,
      user: {
        name: "Alexis",
        id: "123",
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Hola Mundo</h1>
                </PublicRoute>
              }
            />
            <Route path="/" element={<h1>marvel</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("marvel")).toBeTruthy();
  });
});
