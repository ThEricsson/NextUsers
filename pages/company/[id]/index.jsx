import Layout from "../../../components/layout/layout";
import Company from "../../../models/Company";
import dbConnect from "../../../lib/dbConnect";
import Link from "next/dist/client/link";

const CompanyPage = ({ succes, error, company }) => {
  if (!succes) {
    return (
      <div className="text-center text-danger my-3">
        <h1>{error}</h1>
        <Link href="/">
          <a className="btn text-white">{"<- Volver"}</a>
        </Link>
      </div>
    );
  } else {
    return (
      <Layout
        title={"Detalle de " + company.name}
        pageTitle={"Detalle de " + company.name}
      >
        <div className="row d-flex justify-content-center">
          <div className="col-10">
            <div className="d-flex justify-content-md-between align-items-center m-2">
              <p>Trabajadores: {company.users_id.length}</p>

              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Opciones
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link href={company._id + "/edit"}>
                      <a className="dropdown-item text-warning">Editar</a>
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item text-danger">Eliminar</a>
                  </li>
                </ul>
              </div>
            </div>
            <p>{company.description}</p>
            <Link href="/">
              <a className="btn text-primary p-3">{"<- Volver"}</a>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
};

export default CompanyPage;

export async function getServerSideProps({ params }) {
  try {
    await dbConnect();

    const company = await Company.findById(params.id).lean();

    if (!company) {
      return { props: { succes: false, error: "Compañia no encontrada" } };
    }

    company._id = company._id.toString();

    return { props: { succes: true, company } };
  } catch (error) {
    if (error.kind != "ObjectId") {
      return { props: { succes: false, error: "Error del servidor" } };
    }
    return { props: { succes: false, error: "Id no  encontrada" } };
  }
}
