import { Grid } from "semantic-ui-react";
import { Outlet } from "react-router-dom";
import PageHeader from "../../components/Header/Header";

export default function Layout({ loggedUser, handleLogout }) {
    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader loggedUser={loggedUser} handleLogout={handleLogout} />
                </Grid.Column>
            </Grid.Row>
            <Outlet />
        </Grid>
    );
}