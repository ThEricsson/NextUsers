import Form from "../../components/company/Form";
import Layout from "../../components/layout/layout";

const New = () => {
  const formData = {
    name: "",
    description: "",
  };
  return (
    <Layout title="Crear nueva Empresa" pageTitle="Nueva Empresa">
      <>
        <div className="row flex-d justify-content-center">
          <div className="col-6">
            <Form formData={formData} />
          </div>
        </div>
      </>
    </Layout>
  );
};

export default New;
