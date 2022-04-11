import Link from 'next/link';
import { useContext } from 'react';
import UserContext from '../utils/userContext';

function Footer() {
  const { user, setUser } = useContext(UserContext);

  function logout() {
    setUser(null);
    localStorage.setItem('token', '');
  }

  return (
    <footer>
      {user ? (
        <>
          <p className="user">
            Skráður inn sem{' '}
            {JSON.stringify(JSON.parse(user).name).replace(/["]+/g, '')}{' '}
          </p>
          <a onClick={logout}> Skrá út</a>
        </>
      ) : (
        <div className="user">
          <Link href="/login">Skrá inn</Link>
          <Link href="/register">Nýskrá</Link>
        </div>
      )}
      <br />
    </footer>
  );
}

export default Footer;
