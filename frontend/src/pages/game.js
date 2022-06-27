import Nav from "../components/widgets/nav";
import GameComp from "../components/widgets/gamedetail";

export default function GamePage() {
  return (
    <div className="game">
      <header>
        <Nav />
      </header>
      <main className="main_details">
        <GameComp />
      </main>
    </div>
  );
}
