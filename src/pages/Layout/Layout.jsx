import { Grid } from "semantic-ui-react";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../../contexts/UserContext"

import PageHeader from "../../components/Header/Header";


export default function Layout({ loggedUser, handleLogout }) {
    return (
        <UserProvider loggedUser={loggedUser}>
            <Grid centered>
                <Grid.Row>
                    <Grid.Column>
                        <PageHeader handleLogout={handleLogout} />
                    </Grid.Column>
                </Grid.Row>
                <Outlet />
            </Grid>
        </UserProvider>
    );
}