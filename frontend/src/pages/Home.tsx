import { useState, useEffect } from "react";

export default function Home() {
  const [username, setUsername] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    async function checkLoggedInUser() {
      try {
        const token = localStorage.getItem("accessToken")
        if(token) {
          const config = {
            headers: {
              "Authorization": `Bearer $(token)`
            }
          };
          const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            body: JSON.stringify(config),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          setIsLoggedIn(true);
          setUsername(data.username);
        } else {
          setIsLoggedIn(false);
          setUsername("");
        }
      } catch(error) {
        setIsLoggedIn(false);
        setUsername("");
      }
    }
    console.log(username);
    console.log(isLoggedIn);
    
    checkLoggedInUser();
  }, [])
  
  return (
    <>
      <h1>Home</h1>
      {isLoggedIn ? (
        <h2>Hi, {username}. Thanks for loggin in!</h2>
      ) : (
        <h2>Please Login</h2>
      )}
    </>
  )
}
