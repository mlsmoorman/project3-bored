import { useState } from "react"
import { Link } from "react-router-dom"
import { Table, Icon, Button, Image } from "semantic-ui-react"
import { useLoggedUser } from "../../contexts/UserContext";

export default function Activity({updateActivity, activity, userPage, removeLike, addLike}) {
    const loggedUser = useLoggedUser();

    const userId = activity.user._id

    console.log('logged user ==>', loggedUser)
    console.log(activity)

    function handleClick() {
        console.log('COMPLETE STATUS UPDATE CLICKED')
        updateActivity(activity._id);
    }

    const likedIndex = activity.likes.findIndex(
        (like) => like.userId === loggedUser._id
    );

    const likeColor = likedIndex > -1 ? "red" : "grey"

    const clickHandler = 
        likedIndex > -1
            ? () => removeLike(activity.likes[likedIndex]._id)
            : () => addLike(activity._id)


    function handleBlog() {
       console.log('activity key', activity.key)
    }

    // This return only displays the user's activities if on the user's page
    if (userPage) {
        if (loggedUser._id === userId) {
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
                        <Table.Cell>                        
                            <Icon
                                name={'heart'}
                                size={'large'}
                                color={likeColor}
                                onClick={clickHandler}
                            ></Icon>
                            {activity.likes.length} Likes
                        </Table.Cell>
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
                    } */}
                    <Table.Cell>
                        <Icon
                            name={'heart'}
                            size={'large'}
                            color={likeColor}
                            onClick={clickHandler}
                        ></Icon>
                        {activity.likes.length} Likes
                    </Table.Cell>
                </Table.Row>
            </>
        )
    }
}