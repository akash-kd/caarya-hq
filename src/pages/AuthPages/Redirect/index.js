import YodaLoader from "components/Comman/Loaders/YodaLoader";
import { refreshToken } from "config/APIs";

import React from "react";

function RedirectPage() {
  window.onload = async () => {
    let token = window.location.search.substring(
      window.location.search.indexOf("token=") + 6
    );
    localStorage.setItem("token", token);
    try {
      const response = await refreshToken();
      if (response.status === 200) {
        const { token, admin } = response.data.data;
        localStorage.setItem("admin", JSON.stringify(admin));
        localStorage.setItem("role", "admin");
        localStorage.setItem("token", token);
        window.location.href = "/";
      }
    } catch (err) {
      console.log("actions/auth/refreshToken error", err);
      let response = err?.response;

      switch (response?.status) {
        case "401":
          // Logout
          console.log("Refresh token!!", response);
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          break;
        case "403":
          window.location.replace("/accessDenied");
        default:
          // Logout
          console.log("Refresh token!!", response);
          localStorage.removeItem("token");
          localStorage.removeItem("role");
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-row items-center justify-center">
      <YodaLoader text="Redirecting you to a master piece ✨" />
    </div>
  );
}

export default RedirectPage;
