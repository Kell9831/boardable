import * as React from "react";
import { URL_BASE, tokenKey } from "../../constants";
/* eslint-disable react/prop-types */
const authContext = React.createContext({
  token: null,
  signup: () => {},
  login: () => {},
  logout: () => {},
});

export function AuthProvider({children}) {
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    const savedToken = window.localStorage.getItem(tokenKey);

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  async function signup(username, password){
    await authenticate(username, password, "signup");
  }

  async function login(username, password){
    await authenticate(username, password, "login");
  }

  async function authenticate(username, password, endpoint) {
    const url = URL_BASE + `/${endpoint}`;
    const options = {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const body = await response.json();
      setToken(body.data.token);
      window.localStorage.setItem(tokenKey, body.data.token);
    } else {
      const error = await response.json();
      throw new Error(error);
    }
  }

  function logout() {
    setToken(null);
    window.localStorage.removeItem(tokenKey);
  }

  return (
    <authContext.Provider value={{ token, signup,login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(authContext);
}
