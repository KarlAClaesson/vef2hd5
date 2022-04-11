import Link from 'next/link';

function BackButton() {
  return (
    <div>
      <Link className="link" href="/">
        Til baka
      </Link>
    </div>
  );
}

export default BackButton;
