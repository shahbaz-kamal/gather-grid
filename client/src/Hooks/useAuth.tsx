import { useContext } from "react";
import { AuthContext } from "../utils/authContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
