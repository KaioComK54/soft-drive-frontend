import { Navigate } from "react-router-dom";
import { getAuthToken } from "utils/useAuth";

export type ProtectedRouteProps = {
  authenticationPath: string;
  outlet: JSX.Element;
};

const isAuthenticated = () => {
  const token = getAuthToken();

  if (!token) return false;

  return true;
};

export default function ProtectedRoute({
  authenticationPath,
  outlet,
}: ProtectedRouteProps) {
  if (isAuthenticated()) {
    return <Navigate to={{ pathname: authenticationPath }} />;
  } else {
    return outlet;
  }
}
