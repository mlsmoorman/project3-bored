import { createContext, useContext } from "react";

export const UserContext = createContext(null);

export function UserProvider({children, loggedUser}){
    return (
        <UserContext.Provider value={loggedUser}>
            {children}
        </UserContext.Provider>
    )
}

export function useLoggedUser() {
    return useContext(UserContext)
}