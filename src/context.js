import React, {useState} from 'react';

export const Context = React.createContext();

const UserProvider = ({children}) =>{
    const [state, setState] = useState(undefined);

    return (
        <Context.Provider value={[state, setState]}>
        {/* wrap any components */}
            {children}
        </Context.Provider>
    )
}
export default UserProvider;