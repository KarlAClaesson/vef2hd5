import '../styles/globals.css'
import '../styles/styles.css'
import { UserContextProvider } from '../utils/userContext';
import { BASE_URL } from '../utils/consts';
import UserContext from '../utils/userContext';
import { useState, useEffect } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';


function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    async function fetchUser() {
      const token = await localStorage.getItem('token');

      if (token !== '') {
        const res = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          console.log('hér')
          const result = await res.json();
          console.log(result)
          setUser(JSON.stringify(result));
          console.log('notandi: ', user)
        } else {
          setUser(null);
          await localStorage.setItem('token', '');
        }
      }
    }

    fetchUser();
  }, []);
  return (
    <UserContext.Provider
    value={{
      user,
      setUser,
    }}>
      <Header/>
        <Component {...pageProps} />
      <Footer/>
    </UserContext.Provider>

  );
}

export default MyApp
