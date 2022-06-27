import SignUpComp from "../components/widgets/signup";
import "../assets/css/signup.css";
import BgWave from "../components/widgets/bg-wave";


function SignUp() {
  return (
    <div className="page">
      <main>
        <h1 className="text-white">Bem vindo à nossa App!</h1>
        <SignUpComp />
      </main>
      <div className="bg mb-0 pb-0">
        <BgWave />
      </div>
    </div>
  );
}

export default SignUp;
