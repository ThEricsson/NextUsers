import Layout from "../../../components/layout/layout";
import Company from "../../../models/Company";
import dbConnect from "../../../lib/dbConnect";
import Link from "next/dist/client/link";

const CompanyPage = ({ succes, error, company }) => {
  console.log(succes);
  console.log(error);
  console.log(company);

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
        <>
          <p>{company.description}</p>
        </>
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
