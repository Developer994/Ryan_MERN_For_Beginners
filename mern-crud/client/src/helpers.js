// save login response > (user's name and token) to session storage
export const authenticate = (Response, callback) => {
  if (window !== "undefined") {
    // if unsure of what to put for response, do the following on console:
    console.log("auth", response);
    sessionStorage.setItem("token", response.data.token);
    sessionStorage.setItem("user", response.data.name);
  }
  callback();
};

// access user's name from session storage

// access token from session storage

// remove token from session storage
