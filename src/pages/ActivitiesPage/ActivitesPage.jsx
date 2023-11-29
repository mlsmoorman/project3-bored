import { useState, useEffect } from "react";
import { Segment, Table, Grid, Form, Button } from "semantic-ui-react";
import RandomActivityCard from "../../components/RandomActivityCard/RandomActivityCard";
import ActivitiesFeed from "../../components/ActivitiesFeed/ActivitiesFeed";
import tokenService from "../../utils/tokenService";
import activitiesService from "../../utils/activitiesService";

import AddBlogForm from "../../components/AddBlogForm/AddBlogForm";

export default function ActivitiesPage() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
    //    console.log('ACTIVITIES SERVICE RETURN', activitiesService.index());
    //    const tryme = [activitiesService.index()]
    //    console.log('tryme', tryme[0])
    // //    activitiesService.getActivities()
    // //    .then ((data) => {
    // //         setActivities({relatedTo: data})
    // //    })
    // //    console.log('activity in useEffect ======>', activities)
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

    async function addActivity(activityData) {
        
        const res = await fetch("/api/activities", {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json', Authorization: "Bearer " + tokenService.getToken()}),
            body: JSON.stringify(activityData)
        })
        console.log(res)
        const data = await res.json();
        setActivities([...activities, data])
        console.log(data)
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

    function testingKey(activityKey) {
        console.log('testingkey, activity key ===>', activityKey)
    }

    return (
        <Grid centered >
            <Grid.Row>
                <Grid.Column textAlign="center" style={{ maxWidth: 450 }}>
                    <RandomActivityCard addActivity={addActivity} random={true}/> 
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <ActivitiesFeed updateActivity={updateActivity} activities={activities} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <AddBlogForm testingKey={testingKey} activities={activities}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        
    )
        
    
}
