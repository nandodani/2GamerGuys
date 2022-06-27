import Nav from "../components/widgets/nav";
import FavoriteComp from "../components/widgets/cardfavorites";

export default function Favorites() {

  return (
    <div className="favorites">
      <header>
        <Nav />
      </header>
      <h1 className="text-white text-center" style={{ paddingTop: "9rem" }}>
        A tua lista de favoritos!
      </h1>
      <div className="align-items-center mx-auto col-1">
      </div>
      <FavoriteComp />
    </div>
  );
}
