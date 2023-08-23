import {
    createContext,
    FC,
    PropsWithChildren,
    useEffect,
    useState
  } from 'react';
import { auth } from '../config/firebase'
  type ILogginDetails = {
    isLoggedIn?: boolean
    user?: any
    setUser?: any
  }
  const AuthContext = createContext<ILogginDetails>({
    isLoggedIn: false,
    user: {},
  });
  const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isLoggedIn, setIsLoggin] = useState<boolean|undefined>(false);
    const [user, setUser] = useState<any>(null)
    useEffect(() => {
            const loggedIn  = (auth?.currentUser)? true : false
            setUser(auth?.currentUser)
            setIsLoggin(loggedIn)
    },[]);
    return (
      <AuthContext.Provider value={{ isLoggedIn, user, setUser }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export { AuthContext, AuthProvider };
  