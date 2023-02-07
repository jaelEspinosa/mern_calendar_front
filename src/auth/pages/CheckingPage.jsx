import { Spinner } from "../components/Spinner";
import "./loginPage.css";

const CheckingPage = () => {
  return (
    <div className="container login-container login">
      <div className="login-form-1">
        <h3 className="mb-5 text-center">Iniciando sesión...</h3>

        <div className="d-flex justify-content-center align-items-center">
          <Spinner />
        </div>
      </div>
    </div>
  );
};

export default CheckingPage;
