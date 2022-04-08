import Link from 'next/link';

const Event = (event) => {
  return (
    <>
      <p className="event__Title">
        <Link className="events_eventlink" href={`/events/${event.id}`}>
          {event.name}
        </Link>
      </p>
      <p className="events__eventDescription">{event.description}</p>
    </>
  );
};

export default Event;
