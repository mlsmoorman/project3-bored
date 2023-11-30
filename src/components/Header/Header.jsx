import { Header, Segment, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useLoggedUser } from "../../contexts/UserContext";

// ========== Creates the Header which renders on each page ===========
export default function PageHeader({ handleLogout }) {
    const loggedUser = useLoggedUser();
    return (
        <Segment clearing>
            <Header as="h2" floated="right">
                <Link to="/">
                    <Icon name="home"></Icon>
                </Link>
                <Link to="" onClick={handleLogout}>
                    Logout
                </Link>
            </Header>
            <Header as="h2" floated="left">
                <Link to={`/${loggedUser.username}`}>
                    <Image
                        src={
                            loggedUser.photoUrl 
                            ? loggedUser.photoUrl 
                            : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                        }
                        avatar
                    ></Image>
                    Welcome {loggedUser.username}!
                </Link>
            </Header>
            <Header as="h2" textAlign="centered">
                <Link to="/activity">
                    Activity Page
                </Link>
            </Header>
        </Segment>
    )
}