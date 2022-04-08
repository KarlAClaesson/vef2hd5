const Registration = (registration) => {
  return (
    <>
      <ul>
        <li>
          <h3 className="event__registeredName"> {registration.name}</h3>
        </li>
        <p className="event__registeredComment">{registration.comment}</p>
      </ul>
    </>
  );
};

export default Registration;
