import { Header, Segment, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useLoggedUser } from "../../contexts/UserContext";

export default function PageHeader({ handleLogout }) {
    const loggedUser = useLoggedUser();
    return (
        <Segment clearing>
            <Header as="h2" floated="right">
                <Link to="/">
{/* ==================== Icon is not working -- CHECK LATER ====================== */}
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
                </Link>
            </Header>
            <Header as="h2" textAlign="center">
                <Link to={`/random`}>
                    Choose a Random Activity Now!
                </Link>
            </Header>
        </Segment>
    )
}