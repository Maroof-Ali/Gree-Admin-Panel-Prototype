import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <main className="not-found">
      <h1>404</h1>
      <p>The page you requested does not exist.</p>
      <Link className="button button-primary" to="/dashboard">
        Back to Dashboard
      </Link>
    </main>
  );
}
