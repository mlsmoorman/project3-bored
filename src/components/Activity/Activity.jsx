import { useState } from "react"
import { Link } from "react-router-dom"
import { Table, Icon, Button, Image } from "semantic-ui-react"
import { useLoggedUser } from "../../contexts/UserContext";

export default function UserActivity({testingKey, updateActivity, activity, userPage}) {
    const loggedUser = useLoggedUser();

    console.log(activity)

    function handleClick() {
        updateActivity(activity._id);
    }

    function handleBlog() {
       console.log('activity key', activity.key)
    }

    // This return only displays the user's activities if on the user's page
    if (userPage) {
        if (loggedUser._id === activity.user._id) {
            return (
                <>
                    <Table.Row>
                        <Table.Cell>
                            <Image 
                                src={activity.user.photoUrl}
                                avatar
                            />
                        </Table.Cell>
                        <Table.Cell>{activity.activity}</Table.Cell>
                        {activity.completed 
                        ? <Table.Cell><Icon name="check"></Icon></Table.Cell>
                        : <Table.Cell><Button onClick={handleClick}>Complete?</Button></Table.Cell>
                        }
                        <Table.Cell><Button onClick={handleBlog}>PLACEHOLDER</Button></Table.Cell>
       
                    </Table.Row>
                </>
            )
        }
    } else {
        return (
            <>
                <Table.Row>
                    <Table.Cell>
                        <Image 
                            src={activity.user.photoUrl}
                            avatar
                        />
                    </Table.Cell>
                    <Table.Cell>{activity.activity}</Table.Cell>
                    {/* {activity.completed 
                    ? <Table.Cell><Icon name="check"></Icon></Table.Cell>
                    : <Table.Cell><Button onClick={handleClick}>Complete?</Button></Table.Cell>
                    }
                    <Table.Cell><Button onClick={handleBlog}>PLACEHOLDER</Button></Table.Cell> */}

                </Table.Row>
            </>
        )
    }
}