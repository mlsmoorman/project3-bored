import { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import { useLoggedUser } from "../../contexts/UserContext"
import ActivitiesFeed from "../../components/ActivitiesFeed/ActivitiesFeed"
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

    return (
        <Segment>
            <h2>Welcome, {loggedUser.username}!</h2>
            <h3>Below are your...</h3>  
            <ActivitiesFeed activities={activities} userPage={true}/>
        </Segment>
    )
}