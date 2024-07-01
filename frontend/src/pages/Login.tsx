import { useState } from "react";

interface ILogin {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<ILogin>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error during login!", errorData);

        Object.keys(errorData).forEach((field) => {
          const errorMessages = errorData[field];
          if (errorMessages && errorMessages.length > 0) {
            setErrorMessage(errorMessages[0]);
            setSuccessMessage(null);
          }
        });
      } else {
        const data = await response.json();
        console.log("Success!", data);
        setSuccessMessage("Login Successful!");
        setErrorMessage(null);
        localStorage.setItem("accessToken", data.tokens.access);
        localStorage.setItem("refreshToken", data.tokens.refresh);
      }
    } catch (error) {
      console.error("Error during login!", error);
      setErrorMessage("An unexpected error occurred during login.");
      setSuccessMessage(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email:</label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">password:</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <button type="submit" disabled={isLoading}>
          Login
        </button>
      </form>
    </>
  );
}
