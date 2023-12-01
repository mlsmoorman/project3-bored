import { useEffect, useState } from "react";
import { Segment, Image } from "semantic-ui-react";
import { useLoggedUser } from "../../contexts/UserContext"

import ActivityFeed from "../../components/ActivityFeed/ActivityFeed"
import Loading from "../../components/Loading/Loading";
import tokenService from "../../utils/tokenService";

// ========== Function Profile Page renders the user's page to show their personal activities for updates ==========
export default function ProfilePage() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState([false])
    const loggedUser = useLoggedUser();
    
    useEffect(() => {
        getActivities();
    }, [])

    // ========== C(R)UD - obtains data from the server and updates state ==========
    async function getActivities() {
        setLoading(true)
        try {
            const response = await fetch ("api/activities", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + tokenService.getToken(),
                },
            })
            const data = await response.json();
            setActivities(data.activities);
            setLoading(false)
        } catch(err) {
            console.log(err);
            setLoading(false)
        }
    }

    // ========== CR(U)D - updates database to show user completed an activity ==========
    async function updateActivity(activityId) {
        // api call / fetch request goes here
        const response = await fetch(`api/activities/${activityId}`, {
            method: 'PUT',
            headers: new Headers({'Content-Type': 'application/json', Authorization: "Bearer " + tokenService.getToken()}),
            body: JSON.stringify(activities)
        })
        // updates state if the activity clicked on matches the activity in the database
        setActivities(
            activities.map((activity) => {
                return activity._id === activityId
                ? {...activity, completed:true}
                : activity
            })
        )
    }

    // ========== (C)RUD - adds a like to the activity and updates state ==========
    async function addLike(activityId) {
        try {
            const response = await fetch (`/api/activities/${activityId}/likes`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + tokenService.getToken()
                },
            });
            const data = await response.json();
            getActivities();
        } catch(err) {
            console.log(err)
        }
    }

    // ========== CRU(D) - removes a like for a specific activity ==========
    async function removeLike(likeId) {
        try {
            const response = await fetch(`/api/likes/${likeId}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + tokenService.getToken(),
                },
            })
            const data = await response.json();
            getActivities();
        } catch(err) {
            console.log(err);
        }
    }

    if (loading) {
        return (
            <header>
                <Loading />
            </header>
        )
    }

    // ========== Renders the Profile Page showing the user's selected activities to view and update ==========
    return (
        <Segment>
            <h1>Welcome, {loggedUser.username}!</h1>
            <Image src={loggedUser.photoUrl} avatar/>
            <h3>Below are your...</h3>  
            <ActivityFeed 
                updateActivity={updateActivity} 
                activities={activities} 
                userPage={true}
                addLike={addLike}
                removeLike={removeLike}
            />
        </Segment>
    )
}