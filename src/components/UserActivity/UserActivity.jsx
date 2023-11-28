import { useState } from "react"
import { Link } from "react-router-dom"
import { Table, Icon} from "semantic-ui-react"

export default function UserActivity({updateActivity, activity}) {

    function handleClick() {
        updateActivity(activity._id);
    }

    
    return (
        <>
            <Table.Row>
                <Table.Cell>{activity.activity}</Table.Cell>
                {activity.completed 
                ? <Table.Cell><Icon name="check"></Icon></Table.Cell>
                : <Table.Cell><button onClick={handleClick}>Complete?</button></Table.Cell>
                }
                <Table.Cell><Link to="/blog">Let's Discuss!</Link></Table.Cell>
            </Table.Row>
        </>
    )
    
}