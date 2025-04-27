import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface UserContextType {
  email: string;
  setEmail: (email: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailFromUrl = params.get('email');
    if (emailFromUrl) {
      setEmail(emailFromUrl);
      sessionStorage.setItem('email', emailFromUrl); 
    } else {
      const emailFromStorage = localStorage.getItem('email');
      if (emailFromStorage) {
        setEmail(emailFromStorage);
      }
    }
  }, [location]);

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};

// 4. Crear un hook personalizado para usar el contexto más fácil
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
};
