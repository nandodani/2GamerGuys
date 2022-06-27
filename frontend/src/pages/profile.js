import Nav from "../components/widgets/nav";
import ProfileComp from "../components/widgets/profile";

export default function Profile() {
    return (
        <div className="profile">
            <header> <Nav /> </header>
            <div><ProfileComp /></div>
        </div>
    )
}