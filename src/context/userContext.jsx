import { createContext, useContext, useEffect, useState } from "react";

let Context = createContext({});

export const UserContext = ({ children }) => {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userSession = sessionStorage.getItem("userSession");

    userSession
      ? setUserAuth(JSON.parse(userSession))
      : setUserAuth({ accessToken: null });
  }, []);

  return (
    <Context.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </Context.Provider>
  );
};

export const useUserContext = () => useContext(Context);
