import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AuthContext,
  type AuthContextType,
  type User,
} from "../utils/authContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      axiosSecure
        .get("api/auth/currentUser", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const authInfo: AuthContextType = {
    user,
    setUser,
    loading,
    setLoading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
