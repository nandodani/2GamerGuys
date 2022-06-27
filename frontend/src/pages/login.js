import LoginComp from "../components/widgets/login";
import "../assets/css/login.css";
import BgWave from "../components/widgets/bg-wave";

function Login() {
  return (
    <div className="page">
      <main>
        <h1 className="text-white">Bem vindo de volta!</h1>
        <LoginComp />
      </main>
      <div className="bg mb-0 pb-0">
        <BgWave />
      </div>
    </div>
  );
}

export default Login;
