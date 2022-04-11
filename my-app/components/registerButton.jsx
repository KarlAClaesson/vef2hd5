import { useRouter } from 'next/router';
import { useContext } from 'react';
import UserContext from '../utils/userContext';

function RegisterButton() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  console.log(user);

  return (
    <>
      {user ? (
        <button
          onClick={async () => {
            setUser(null);
            localStorage.setItem('token', '');
          }}
        >
          útskrá
        </button>
      ) : (
        <button
          onClick={async () => {
            router.push('/register');
          }}
        >
          Nýskrá
        </button>
      )}
    </>
  );
}

export default RegisterButton;
