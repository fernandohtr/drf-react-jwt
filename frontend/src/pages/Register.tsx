import React, { useState } from "react";

interface IUser {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export default function Register() {
  const [formData, setFormData] = useState<IUser>({
    username: "",
    email: "",
    password1: "",
    password2: "",
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
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error during registration!", errorData);

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
        setSuccessMessage("Registration Successful!");
        setErrorMessage(null);
      }
    } catch (error) {
      console.error("Error during registration!", error);
      setErrorMessage("An unexpected error occurred during registration.");
      setSuccessMessage(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <div className="credentials">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
          <label htmlFor="email">email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="password1">password1:</label>
          <input
            type="password"
            name="password1"
            id="password1"
            value={formData.password1}
            onChange={handleChange}
          />
          <label htmlFor="password2">password2:</label>
          <input
            type="password"
            name="password2"
            id="password2"
            value={formData.password2}
            onChange={handleChange}
          />
          <button type="submit" disabled={isLoading}>
            Register
          </button>
        </form>
      </div>
    </section>
  );
}
