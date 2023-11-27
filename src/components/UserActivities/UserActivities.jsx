import { Segment, Grid, Table } from "semantic-ui-react"
import tokenService from "../../utils/tokenService";
import { useEffect, useState } from "react";
import UserActivity from "../UserActivity/UserActivity";

export default function UserActivities() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
       getActivities();
    }, [setActivities])

    async function getActivities() {
        try {
            const response = await fetch ("api/activities", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + tokenService.getToken(),
                },
            })
            const data = await response.json();
            console.log("data", data);
            setActivities(data.activities);
        } catch(err) {
            console.log(err);
        }
    }

    const displayActivities = activities.map((activity) => {
        return <UserActivity activity={activity} />
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