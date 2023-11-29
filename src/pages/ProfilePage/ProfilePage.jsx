import { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import { useLoggedUser } from "../../contexts/UserContext"
import ActivityFeed from "../../components/ActivityFeed/ActivityFeed"
import tokenService from "../../utils/tokenService";


export default function ProfilePage() {
    const loggedUser = useLoggedUser();
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        getActivities();
    }, [])

    async function getActivities() {
        try {
            const response = await fetch ("api/activities", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + tokenService.getToken(),
                },
            })
            const data = await response.json();
            console.log("===========data===============", data);
            setActivities(data.activities);
        } catch(err) {
            console.log(err);
        }
    }

    async function updateActivity(activityId) {
        // api call / fetch request goes here
        console.log('ACTIVITY ID', activityId)
        
        const response = await fetch(`api/activities/${activityId}`, {
            method: 'PUT',
            headers: new Headers({'Content-Type': 'application/json', Authorization: "Bearer " + tokenService.getToken()}),
            body: JSON.stringify(activities)
        })
        
        console.log('updateActivity', response)
        // conditionally update state based on response
        setActivities(
            activities.map((activity) => {
                return activity._id === activityId
                ? {...activity, completed:true}
                : activity
            })
        )
    }

    return (
        <Segment>
            <h2>Welcome, {loggedUser.username}!</h2>
            <h3>Below are your...</h3>  
            <ActivityFeed updateActivity={updateActivity} activities={activities} userPage={true} />
        </Segment>
    )
}