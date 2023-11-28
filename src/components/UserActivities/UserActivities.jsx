import { Segment, Grid, Table } from "semantic-ui-react"
import tokenService from "../../utils/tokenService";
import { useEffect, useState } from "react";
import UserActivity from "../UserActivity/UserActivity";


export default function UserActivities({updateActivity, activities}) {
    

    const displayActivities = activities.map((activity, idx) => {
        return <UserActivity updateActivity={updateActivity} activity={activity} key={idx} />
    })

    return (
        <Segment>
            <h2>User Accepted Activities</h2>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Activity</Table.HeaderCell>
                        <Table.HeaderCell>Completed?</Table.HeaderCell>
                        <Table.HeaderCell>Add Blog/View Blog</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {displayActivities}
                </Table.Body>
            </Table>
        </Segment>
    )
}