import Layout from "../components/layout/layout";
import Company from "../models/Company";
import dbConnect from "../lib/dbConnect";
import Link from "next/dist/client/link";

export default function Home({ companies }) {
  return (
    <>
      <Layout title="Home" pageTitle="Lista de empresas">
        <>
          <div className="d-flex justify-content-md-start">
            {companies.map(({ _id, name, users_id }) => (
              <div
                className="card text-white m-2 bg-secondary custom-company-card"
                key={_id}
              >
                <h5 className="card-header text center">{name}</h5>
                <div className="card-body">
                  <p>Trabajadores: {users_id.length}</p>
                  <Link href={"/company/" + _id}>
                    <a>
                      <button className="btn btn-primary">See more</button>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  try {
    await dbConnect();

    const res = await Company.find({});

    const companies = res.map((doc) => {
      const company = doc.toObject();
      company._id = `${company._id}`;

      return company;
    });

    //console.log(companies);

    return { props: { companies } };
  } catch (error) {
    return { props: { succes: false, error } };
  }
}
