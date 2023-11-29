import { Segment, Grid, Table } from "semantic-ui-react"
import tokenService from "../../utils/tokenService";
import { useEffect, useState } from "react";
import Activity from "../Activity/Activity";
import { useLoggedUser } from "../../contexts/UserContext";

export default function UserActivities({updateActivity, activities, userPage}) {
    
    const loggedUser = useLoggedUser();

    const displayActivities = activities.map((activity, idx) => {
        return <Activity updateActivity={updateActivity} activity={activity} userPage={userPage} key={idx} />
    })


    if (userPage) {
        return (
            <Grid textAlign="center" >
                {/* <h2>{loggedUser.username}'s Activities</h2> */}
                <h2>Selected Activities</h2>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>User</Table.HeaderCell>
                            <Table.HeaderCell>Activity</Table.HeaderCell>
                            <Table.HeaderCell>Completed?</Table.HeaderCell>
                            <Table.HeaderCell>Add Blog/View Blog</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {displayActivities}
                    </Table.Body>
                </Table>
            </Grid>
        )
    } 
    
    return (
        <Segment textAlign="center" >
            {/* <h2>{loggedUser.username}'s Activities</h2> */}
            <h2>Selected Activities</h2>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>User</Table.HeaderCell>
                        <Table.HeaderCell>Activity</Table.HeaderCell>
                        {/* <Table.HeaderCell>Completed?</Table.HeaderCell>
                        <Table.HeaderCell>Add Blog/View Blog</Table.HeaderCell> */}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {displayActivities}
                </Table.Body>
            </Table>
        </Segment>
    )
}