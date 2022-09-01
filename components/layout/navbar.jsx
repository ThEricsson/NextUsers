import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar mb-3 navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand text-primary user-select-none">
          NextUsers
        </span>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="http://localhost:3000/">
                <a className="nav-link">Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="http://localhost:3000/company/new">
                <a className="nav-link">New company</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
