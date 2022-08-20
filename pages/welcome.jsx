import Link from "next/link";

export default function Welcome() {
  return (
    <main className="container">
      <div className="text-center m-5 p-5">
        <h1>
          Welcome to <a className="text-primary">NextUsers</a>
        </h1>
        <p>
          NextUsers! Una herramienta web enfocada en la gestión de usuarios y
          roles.
        </p>
        <Link href="/">
          <a className="btn btn-primary">Vamos!</a>
        </Link>
      </div>
    </main>
  );
}
