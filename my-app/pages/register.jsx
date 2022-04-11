import { useState } from 'react';
import BackButton from '../components/BackButton';

function registrationPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  async function postRegister({ name, username, password }) {
    console.log(name);
    const request = await fetch(
      `https://vef2-20222-v3-synilausn.herokuapp.com/users/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, password }),
      }
    );
    if (request.ok) {
      const data = await request.json();
      console.log(`User ${data.username} successfully created`);
      setUser(data);
    } else {
      const message = await request.json();
      console.log(message);
    }
  }
  return (
    <>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <label>Nafn:</label>
        <input
          className="field"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Notendanafn:</label>
        <input
          className="field"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Lykilorð:</label>
        <input
          className="field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="button"
          onClick={() => postRegister({ name, username, password })}
        >
          {'Skrá'}
        </button>
      </form>
      <BackButton />
    </>
  );
}

export default registrationPage;
