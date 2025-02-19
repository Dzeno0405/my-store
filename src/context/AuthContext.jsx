import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";  // Ensure correct Firebase import
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();  // ✅ This must exist

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}  
    </AuthContext.Provider>
  );
};

// ✅ Make sure this is exported correctly
export const useAuth = () => {
  return useContext(AuthContext);
};
