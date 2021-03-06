import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import BackButton from '../../../components/BackButton';
import Registration from '../../../components/Registration';
import { BASE_URL } from '../../../utils/consts';
import UserContext from '../../../utils/userContext';

function eventsDetails({ event, registrations }) {
  const { user, setUser } = useContext(UserContext);
  const [registered, setRegistered] = useState(false);
  const [registrationList, setRegistrations] = useState(registrations);
  const [comment, setComment] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`${BASE_URL}/events/${id}`);
      const result = await res.json();
      const registrations = await result.registrations;
      const JSONuser = await JSON.parse(user);
      console.log('registrationList ', registrationList);
      const userRegistrations = registrations.filter(
        (registration) => registration.id === JSONuser.id
      );
      console.log('userregistrations', userRegistrations);
      if (userRegistrations.length > 0) setRegistered(true);
      else setRegistered(false);
    }
    if (user) {
      fetchUser();
    }
  }, [user, registrations]);

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
    if (request.ok && user) {
      const JSONuser = JSON.parse(user);
      const data = await request.json();
      setRegistrations([
        ...registrationList,
        { id: JSONuser.id, name: JSONuser.name, comment: comment },
      ]);
      setRegistered(true);
      console.log('skráning móttekin ', data);
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
    if (request.ok && user) {
      const JSONuser = JSON.parse(user);
      const data = await request.json();
      const newRegistrationList = registrationList.filter(
        (registration) => registration.id != JSONuser.id
      );
      setRegistrations(newRegistrationList);
      setRegistered(false);
      console.log('afskráning móttekin ', data);
    } else {
      const message = await request.json();
      console.log(message);
    }
  }

  console.log('hjello ', user);
  return (
    <>
      <h1>{event.name}</h1>
      <p className="events__eventDescription">{event.description}</p>
      {registrationList.map((registration) => (
        <React.Fragment key={registration.id}>
          {Registration(registration)}
        </React.Fragment>
      ))}

      {user && (
        <section>
          {!registered ? (
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
          ) : (
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
          )}
        </section>
      )}
      <BackButton />
    </>
  );
}

export default eventsDetails;

export const getServerSideProps = async (context) => {
  const res = await fetch(`${BASE_URL}/events/${context.params.id}`);
  const result = await res.json();
  const registrations = await result.registrations;

  const uniqueIds = [];

  const uniqueRegistrations = registrations.filter((registration) => {
    const isDuplicate = uniqueIds.includes(registration.id);

    if (!isDuplicate) {
      uniqueIds.push(registration.id);

      return true;
    }
  });

  return {
    props: {
      event: result,
      registrations: uniqueRegistrations,
    },
  };
};
