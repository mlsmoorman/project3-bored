import { Segment, Grid, Table } from "semantic-ui-react"
import Activity from "../Activity/Activity";

export default function ActivityFeed({updateActivity, activities, userPage, removeLike, addLike}) {
    console.log(activities)
    const validActivities = activities.filter((act) => {
        if (act.user && act.user._id) return true
        return false
    })
    console.log('validActivities=========>', validActivities)

    const displayActivities = validActivities.map((activity, idx) => {
        return <Activity 
            updateActivity={updateActivity} 
            activity={activity} 
            userPage={userPage} 
            removeLike={removeLike} 
            addLike={addLike} 
            key={idx} 
        />
    })

    if (userPage) {
        return (
            <Grid textAlign="center" >
                <h2>Selected Activities</h2>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>User</Table.HeaderCell>
                            <Table.HeaderCell>Activity</Table.HeaderCell>
                            <Table.HeaderCell>Completed?</Table.HeaderCell>
                            <Table.HeaderCell>Likes</Table.HeaderCell>
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
            <h2>Selected Activities</h2>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>User</Table.HeaderCell>
                        <Table.HeaderCell>Activity</Table.HeaderCell>
                        {/* <Table.HeaderCell>Completed?</Table.HeaderCell> */}
                        <Table.HeaderCell>Likes</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {displayActivities}
                </Table.Body>
            </Table>
        </Segment>
    )
}