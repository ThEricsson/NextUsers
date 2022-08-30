import Layout from "../components/layout/layout";
import Company from "../models/Company";
import dbConnect from "../lib/dbConnect";

export default function Home({ companies }) {
  return (
    <>
      <Layout title="Home" pageTitle="Lista de empresas">
        <>
          {companies.map(({ _id, name, users_id }) => (
            <div className="card text-white bg-dark" key={_id}>
              <h5 className="card-header text center">{name}</h5>
              <div className="card-body">
                <p>{users_id.length}</p>
              </div>
            </div>
          ))}
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
    console.log(error);
    return { props: error };
  }
}
