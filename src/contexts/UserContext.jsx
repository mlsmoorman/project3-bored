import { createContext, useContext } from "react";

export const UserContext = createContext(null);

export function UserProvider({children, loggedUser}){
    console.log(loggedUser, 'in userProfide')
    return (
        <UserContext.Provider value={loggedUser}>
            {children}
        </UserContext.Provider>
    )
}

export function useLoggedUser() {
    return useContext(UserContext)
}