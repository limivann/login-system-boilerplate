import React, { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AccountContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: null });
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:5000/auth/login', {
          credentials: 'include',
        });
        if (!res || !res.ok || res.status >= 400) {
          setUser({ loggedIn: false });
          return;
        }
        const data = await res.json();
        if (!data) {
          setUser({ loggedIn: false });
          return;
        }
        setUser({ ...data });
        navigate('/home'); // will redirect whenever
      } catch (err) {
        console.log(err.message);
        setUser({ loggedIn: false });
        return;
      }
    }
    // console.log('HEH');
    fetchData();
    // eslint-disable-next-line
  }, []);
  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
