import { useState, useEffect } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkLoggedInUser() {
      try {
        const token = localStorage.getItem("accessToken");

        if (token) {
          const response = await fetch("http://127.0.0.1:8000/api/user/", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            setIsLoggedIn(false);
            setUsername("");
          } else {
            const data = await response.json();
            setIsLoggedIn(true);
            setUsername(data.username);
          }
        } else {
          setIsLoggedIn(false);
          setUsername("");
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUsername("");
      }
    }

    checkLoggedInUser();
  }, []);

  async function handleLogout() {
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await fetch("http://127.0.0.1:8000/api/logout/", {
      method: "POST",
      body: JSON.stringify({ refresh: refreshToken }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
      setUsername("");
    } else {
      console.error("Failed to Logout!");
    }
  }

  return (
    <>
      <h1>Home</h1>
      {isLoggedIn ? (
        <>
          <h2>Hi, {username}. Thanks for loggin in!</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <h2>Please Login</h2>
      )}
    </>
  );
}
