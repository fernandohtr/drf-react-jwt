import React, { useState } from "react";

interface IUser {
  username: string;
  email: string;
  password1: string;
  password2: string;
};

export default function Register() {
  const [formData, setFormData] = useState<IUser>({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
      console.log("Success!", response.json());
    } catch (error) {
      console.error("Error during registration!", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username:</label>
        <br />
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
        <br />
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
        <label htmlFor="password1">password1:</label>
        <br />
        <input
          type="password"
          name="password1"
          id="password1"
          value={formData.password1}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password2">password2:</label>
        <br />
        <input
          type="password"
          name="password2"
          id="password2"
          value={formData.password2}
          onChange={handleChange}
        />
        <br />
        <button type="submit" disabled={isLoading}>
          Register
        </button>
      </form>
    </>
  );
};
