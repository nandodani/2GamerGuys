import NavLanding from "../components/widgets/navlanding";
import LandingComp from "../components/widgets/landing";
import BgWave from "../components/widgets/bg-wave";

export default function Landing() {
  return (
    <div className="landing">
      <header>
        <NavLanding />
      </header>
      <main className="pb-0 ">
        <LandingComp />
      </main>
      <div className="bg mb-0 pb-0">
        <BgWave />
      </div>
    </div>
  );
}
