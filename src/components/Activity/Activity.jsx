import { Grid, Segment, Item, Progress, Button } from "semantic-ui-react"
import { useState } from "react";
import tokenService from "../../utils/tokenService";
import UserActivities from "../UserActivities/UserActivities";

export default function Activity({randomActivity}) {
    
    const difficultyPercent = randomActivity.accessibility * 100
    
    let priceFree = false;
    const pricePercent = randomActivity.price * 100
    if (pricePercent === 0) {priceFree = true}

    function handleClick(e) {
        e.preventDefault(); 
        addActivity(randomActivity);
    }

    // (C)RUD - creating the random activity within the database with the user who selected it
    async function addActivity(activityData) {
        return fetch("/api/activities", {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json', Authorization: "Bearer " + tokenService.getToken()}),
            body: JSON.stringify(activityData)
        })
    }

    return (
        <Segment>
            <Item.Group>
                <Item onClick={handleClick}>
                    <Item.Content>
                        <Item.Header as='a'>And your activity is...</Item.Header>
                        <h2 style={{color:"purple"}}>{randomActivity.activity}</h2>
                        <h3>Type of Activity: {randomActivity.type}</h3>
                        <h3>Number of participants: {randomActivity.participants}</h3>
                        <h3>Difficulty</h3>
                        <Progress percent={difficultyPercent} />
                        <>
                            {priceFree
                            ? <h3>This activity is free!!!</h3> 
                            : <h3>$$Cost$$
                                <Progress percent={pricePercent} color="green"/>
                            </h3>}
                        </>
                        <Button color="blue" type="submit">Accept Activity</Button>
                    </Item.Content>
                </Item>
            </Item.Group>
            <UserActivities />
        </Segment>
    )
}