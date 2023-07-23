import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthContextState {
 isLoggedIn: boolean;
 token?: string;
 userName?: string;
 permission?: string;
 login: (userName: string, token: string, permission: string) => void;
 logout: () => void;
}

const initialState = {
 isLoggedIn: false,
 login: (userName: string, token: string, permission: string) => {},
 logout: () => {},
};

const AuthContext = createContext<AuthContextState>(initialState);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [userName, setUserName] = useState<string>();
 const [token, setToken] = useState<string>();
 const [permission, setPermission] = useState<string>();

 useEffect(() => {
   const data = localStorage.getItem("user");
   if (data) {
     const user = JSON.parse(data);
     setIsLoggedIn(true);
     setToken(user.token);
     setUserName(user.userName);
     setPermission(user.permission)
   }
 }, []);
 const auth = {
   isLoggedIn: isLoggedIn,
   token,
   userName,
   permission,
   login: (username: string, token: string, permission: string) => {
    setUserName(username);
     setToken(token);
     setPermission(permission)
     setIsLoggedIn(true);
   },
   logout: () => {
     localStorage.removeItem("user");
     setUserName(undefined);
     setToken(undefined);
     setPermission(undefined);
     setIsLoggedIn(false);
   },
 };
 return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthContext;
