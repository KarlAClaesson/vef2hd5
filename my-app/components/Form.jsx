import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../utils/consts';
import UserContext from '../utils/userContext';

function Form() {
  const { user, setUser } = useContext(UserContext);
  const [registered, setRegistered] = useState(false);
  const [comment, setComment] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`${BASE_URL}/events/${id}`);
      const result = await res.json();
      const registrations = await result.registrations;
      console.log('haleluja', registrations);
      const JSONuser = await JSON.parse(user);
      const userRegistrations = registrations.filter(
        (registration) => registration.id === JSONuser.id
      );
      if (userRegistrations.length > 0) setRegistered(true);
      else setRegistered(false);
    }
    if (user) {
      fetchUser();
    }
  }, []);

  async function postCommment({ comment }) {
    const token = await localStorage.getItem('token');

    const request = await fetch(
      `https://vef2-20222-v3-synilausn.herokuapp.com/events/${id}/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment }),
      }
    );
    if (request.ok) {
      const data = await request.json();
      setRegistered(true);
      console.log('athugasemd móttekin ', data);
    } else {
      const message = await request.json();
      console.log(message);
    }
  }

  async function deleteComment() {
    const token = await localStorage.getItem('token');

    const request = await fetch(
      `https://vef2-20222-v3-synilausn.herokuapp.com/events/${id}/register`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment }),
      }
    );
    if (request.ok) {
      const data = await request.json();
      setRegistered(false);
      console.log('afskráning móttekin ', data);
    } else {
      const message = await request.json();
      console.log(message);
    }
  }

  if (registered === false && user) {
    return (
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="Input">
          <label className="field_label">Athugasemd</label>
          <input
            value={comment}
            className="field input"
            onChange={(e) => setComment(e.target.value)}
          ></input>
        </div>
        <button
          className="button"
          onClick={() => {
            postCommment({ comment });
          }}
        >
          Skrá mig
        </button>
      </form>
    );
  }
  if (user) {
    return (
      <>
        <p>Þú hefur skráð þig á þennan viðburð</p>
        <button
          onClick={() => {
            deleteComment();
          }}
        >
          Afskrá
        </button>
      </>
    );
  }
}

export default Form;
