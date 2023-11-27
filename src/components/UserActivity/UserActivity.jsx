import { Table } from "semantic-ui-react"

export default function UserActivity({activity}) {
    console.log("Activity", activity)
    return (
        <>
            <Table.Row>
                <Table.Cell>{activity.activity}</Table.Cell>
                <Table.Cell>Completed 1</Table.Cell>
                <Table.Cell>AddView 1</Table.Cell>
            </Table.Row>
        </>
    )
    
}