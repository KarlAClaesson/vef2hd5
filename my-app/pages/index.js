import { useEffect } from "react";
import { useState } from "react";

import Event from "./Event.js";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const eventsFromServer = await fetchEvents();
      setEvents(eventsFromServer);
    };
    getEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch(
      "https://vef2-20222-v3-synilausn.herokuapp.com/events"
    );
    const data = await res.json();
    return data.items;
  };

  return (
    <>
      <h2>Viðburðir á Næstunni</h2>
      {events.map((event) => (
        <h3 key={event.id}>{Event(event)}</h3>
      ))}
    </>
  );
}

export default EventList;
