import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isLoggedIn, children }) {
  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
