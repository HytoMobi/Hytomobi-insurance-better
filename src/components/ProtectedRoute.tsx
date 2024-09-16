import React from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    const userInfoString = localStorage.getItem("userInfo");
    if (!userInfoString) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      router.push("/auth");
      return;
    } else {
      const userInfo = JSON.parse(userInfoString);
      const currentTime = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000;

      // Check if the login is older than one day
      if (currentTime - userInfo.timestamp > oneDay) {
        localStorage.removeItem("userInfo");
        localStorage.setItem("redirectAfterLogin", window.location.pathname);
        router.push("/auth");
      }
    }
  }
  return <>{children}</>;
};

export default ProtectedRoute;
