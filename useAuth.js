// src/useAuth.js
import { useState, useEffect } from 'react';
import { auth } from "./src/firebase"; // Adjust the import path as needed

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return { user };
};
