import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();

function UserContextProvider(props) {
  const [user, setUser] = useState(undefined);

  async function getUser() {
    const userRes = await axios.get("http://localhost:5000/auth/loggedIn");
    setUser(userRes.data);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{user, getUser}}>{props.children}</UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };
