import Link from "next/link";
import { useState } from "react";
import Router from "next/router";

const Form = ({ formData, formNewUser = true }) => {
  const [form, setForm] = useState({
    name: formData.name,
    description: formData.description,
  });

  const [message, setMessage] = useState([]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setMessage([{ message: "" }]);
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formNewUser) {
      postData(form);
    } else {
      console.log("me diste click maraca");
    }
  };

  const postData = async (form) => {
    try {
      const res = await fetch("/api/user/post-user", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json(data);

      if (!data.succes) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key];
          setMessage([{ message: error.message }]);
        }
      } else {
        Router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {message.map(({ message }) => (
        <p className="text-danger" key={message}>
          {message}
        </p>
      ))}
      <form onSubmit={handleSubmit}>
        <label className="mb-1">
          Nombre<span className="text-danger"> *</span>{" "}
        </label>
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Ingresar name"
          autoComplete="off"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <label className="mb-1">Descripción</label>
        <textarea
          type="text"
          className="form-control mb-4"
          placeholder="Ingresar descripción"
          autoComplete="off"
          name="description"
          value={form.description}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="btn btn-primary">
          {formNewUser ? "Crear" : "Editar"}
        </button>
      </form>

      <Link href="/">
        <a className="btn text-primary my-4 p-3">{"<- Volver"}</a>
      </Link>
    </>
  );
};

export default Form;
