import { useState, useEffect } from "react";
import { Segment, Table, Grid, Form, Button } from "semantic-ui-react";
import RandomActivityCard from "../../components/RandomActivityCard/RandomActivityCard";
import ActivityFeed from "../../components/ActivityFeed/ActivityFeed";
import tokenService from "../../utils/tokenService";
import Loading from "../../components/Loading/Loading";

// Activity Page allows users to choose an activity or browse other user selected activities and like them
export default function ActivityPage() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);

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

    // ========== (C)RUD - adds the user selected activity to the database and updates state ==========
    async function addActivity(activityData) {    
        const res = await fetch("/api/activities", {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json', Authorization: "Bearer " + tokenService.getToken()}),
            body: JSON.stringify(activityData)
        })
        const data = await res.json();
        setActivities([...activities, data])
    }

    // ========== CR(U)D - updates database to show user completed an activity ==========
    async function updateActivity(activityId) {
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

    // ========== Renders the Random Activity Card for selection and the selected activities to the page ==========
    return (
        <Grid centered >
            <Grid.Row>
                <Grid.Column textAlign="center" style={{ maxWidth: 450 }}>
                    <RandomActivityCard addActivity={addActivity} random={true}/> 
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <ActivityFeed 
                        updateActivity={updateActivity} 
                        activities={activities} 
                        removeLike={removeLike}
                        addLike={addLike}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
