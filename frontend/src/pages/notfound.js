import BgWave from "../components/widgets/bg-wave";
import Nav from "../components/widgets/nav";
import {Link} from "react-router-dom";

function Login() {
  return (
    <div className="page">
      <header>
        <Nav />
      </header>
      <main>
        <h1 className="text-white" style={{ paddingTop: "9rem" }}>
          Error 404!
        </h1>
        <Link to="/home" className="text-white">
          <h3>Voltar à homepage!</h3>
        </Link>
      </main>
      <div className="bg mb-0 pb-0">
        <BgWave />
      </div>
    </div>
  );
}

export default Login;
