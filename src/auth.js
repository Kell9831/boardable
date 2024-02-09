
import { URL_BASE, tokenKey } from "./constants";

const savedToken = window.localStorage.getItem(tokenKey);

export const authProvider = {
  //si hay token en localstorage 
  isAuthenticated: savedToken !== null,
  token: savedToken,
  async login(username, password) {
    const url = URL_BASE + "/login";
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

      authProvider.isAuthenticated = true;
      authProvider.token = body.data.token;
      window.localStorage.setItem(tokenKey, body.data.token);
    } else {
      const error = await response.json();
      throw new Error(error);
    }

   
  },
  async logout() {
    window.localStorage.removeItem(tokenKey);

    authProvider.isAuthenticated = false;
    authProvider.token = null;
  },

  async createUser(username, password) {
    const url = URL_BASE + "/signup";
    const options = {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    try {
      const response = await fetch(url, options);
      console.log("este es url y options" + url + options)

      if (response.ok) {
        const body = await response.json();
  
        if (body && body.data.token) {
          authProvider.isAuthenticated = true;
          authProvider.token = body.data.token;
          window.localStorage.setItem(tokenKey, body.data.token);
        } else {
          throw new Error("Invalid response format");
        }
      } else {
        const error = await response.json();
        throw new Error(error.message || "Error creating user");
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw new Error("Error creating user. Please try again.");
    }
  }

}
  

