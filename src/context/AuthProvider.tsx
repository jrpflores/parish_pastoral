import {
    createContext,
    FC,
    PropsWithChildren,
    useEffect,
    useState
  } from 'react';
import { useLocation } from 'react-router-dom';
  
  type ILogginDetails = {
    isLoggedIn?: boolean
  }
  const AuthContext = createContext<ILogginDetails>({
    isLoggedIn: false
  });
  const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isLoggedIn, setIsLoggin] = useState<boolean|undefined>(false);
    const location = useLocation();
    const {pathname} = location;
    useEffect(() => {
            const loggedIn  = sessionStorage.getItem("auth") == "true" || false
            setIsLoggin(loggedIn)
            if(!loggedIn && pathname !== '/auth/signin'){
                window.location.href ="/auth/signin"
            }
    },[]);
    return (
      <AuthContext.Provider value={{ isLoggedIn }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export { AuthContext, AuthProvider };
  