import Layout from "../../../components/layout/layout";
import Form from "../../../components/company/Form";
import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");

    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const { data } = await res.json();

  return data;
};

const EditCompany = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: company, error } = useSWR(
    id ? `/api/company/${id}` : null,
    fetcher
  );

  if (error) {
    return (
      <div className="text-center text-danger my-3">
        <h1>Error</h1>
        <Link href="/">
          <a className="btn text-white">{"<- Volver"}</a>
        </Link>
      </div>
    );
  }

  if (!company) {
    return (
      <Layout title={"Cargando..."} pageTitle={"Cargando..."}>
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      </Layout>
    );
  }

  const formData = {
    name: company.name,
    description: company.description,
  };
  return (
    <Layout
      title={"Editar " + company.name}
      pageTitle={"Editar " + company.name}
    >
      <>
        <div className="row flex-d justify-content-center">
          <div className="col-6">
            <Form formData={formData} formNewCompany={false}></Form>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default EditCompany;
