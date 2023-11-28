import { useState, useEffect } from "react";
import { Segment, Table, Grid, Form, Button } from "semantic-ui-react";
import Activity from "../../components/Activity/Activity";
import UserActivities from "../../components/UserActivities/UserActivities";
import tokenService from "../../utils/tokenService";

export default function ActivitiesPage() {
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
            console.log("data", data);
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
        const response = await fetch(`api/${activityId}`, {
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
        <>
            <Activity addActivity={addActivity} random={true}/> 
            <UserActivities updateActivity={updateActivity} activities={activities} />
        </>
    )
        
    
}
