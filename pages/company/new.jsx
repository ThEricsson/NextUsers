import Layout from "../../components/layout/layout";
import Link from "next/link";
import { useState } from "react";
import Router from "next/router";

const New = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [message, setMessage] = useState([]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData(form);
  };

  const postData = async (form) => {
    try {
      const res = await fetch("/api/company/post-company", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json(data);

      console.log(data);

      if (!data.succes) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key];
          setMessage((oldmessage) => [
            ...oldmessage,
            { message: error.message },
          ]);
        }
      } else {
        Router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Crear nueva Empresa" pageTitle="Nueva Empresa">
      <>
        <div className="row flex-d justify-content-center">
          <div className="col-6">
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
              <input type="submit" value="Crear" className="btn btn-primary" />
            </form>

            <Link href="/">
              <a className="btn text-primary my-4 p-3">{"<- Volver"}</a>
            </Link>
          </div>
        </div>
        {message.map(({ message }) => (
          <p className="text-danger" key={message}>
            {message}
          </p>
        ))}
      </>
    </Layout>
  );
};

export default New;
