// save login response > (user's name and token) to session storage
export const authenticate = (response, callback) => {
  if (window !== "undefined") {
    // if unsure of what to put for response, do the following on console:
    console.log("auth", response);
    sessionStorage.setItem("token", JSON.stringify(response.data.token));
    sessionStorage.setItem("user", JSON.stringify(response.data.name));
  }
  callback();
};

// access token name from session storage
export const getToken = () => {
  if (window !== "undefined") {
    // if unsure of what to put for response, do the following on console:
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token"));
    } else {
      return false;
    }
  }
};

// access user name from session storage
export const getUser = () => {
  if (window !== "undefined") {
    // if unsure of what to put for response, do the following on console:
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user"));
    } else {
      return false;
    }
  }
};

// remove token from session storage
export const logout = (callback) => {
  if (window !== "undefined") {
    sessionStorage.removeItem("token");
    sessionStorage.setItem("user");
  }
  callback();
};
