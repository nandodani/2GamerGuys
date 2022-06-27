import Nav from "../components/widgets/nav";
import UpdateForm from "../components/widgets/form.update";

export default function Update() {
    return (
        <div className="profile">
            <header> <Nav /> </header>
            <div><UpdateForm /></div>
        </div>
    )
}