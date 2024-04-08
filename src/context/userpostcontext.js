import { createContext, useState } from "react";


export const Userpost= createContext()




export default function Userpostcontext(props) {
      const [userpost, setUserpost] = useState(null);
    
      return (
        <Userpost.Provider value={{userpost,setUserpost}}>
            {props.children}
         
        </Userpost.Provider>
      );
    }