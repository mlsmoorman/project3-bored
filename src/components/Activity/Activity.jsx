import { Table, Icon, Button, Image } from "semantic-ui-react"
import { useLoggedUser } from "../../contexts/UserContext";

// ========== This function takes a single activity and renders it on the form ==========
export default function Activity({ updateActivity, activity, userPage, removeLike, addLike }) {
    const loggedUser = useLoggedUser();
    const userId = activity.user._id

    // HandleClick updates the activity to show a user completed the activity
    function handleClick() {
        updateActivity(activity._id);
    }

    // =========== LIKES FUNCTIONALITY ==========
    // This assigns the index of the clicked on activity to a variable - likedIndex
    const likedIndex = activity.likes.findIndex(
        (like) => like.userId === loggedUser._id
    );
    
    // This assigns a color - red if user has liked an activity or grey if they haven't
    const likeColor = likedIndex > -1 ? "red" : "grey"

    // When the heart icon is clicked on, calls remove/addLike depending on state
    const clickHandler = 
        likedIndex > -1
            ? () => removeLike(activity.likes[likedIndex]._id)
            : () => addLike(activity._id)


    // This return only displays the user's activities if the request is coming from the ProfilePage
    if (userPage) {
        if (loggedUser._id === userId) {
            return (
                <>
                    <Table.Row>

                        <Table.Cell>{activity.activity}</Table.Cell>
                    {/* Checks if activity is complete - yes: checkmark // no: button to update once complete */}
                        {activity.completed 
                        ? <Table.Cell>
                            <Icon name="check" color="green"></Icon>
                          </Table.Cell>
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
    // Requests from any other page return the following display
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