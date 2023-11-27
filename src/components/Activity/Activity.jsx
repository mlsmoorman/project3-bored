import { Grid, Segment, Item, Progress, Button } from "semantic-ui-react"
import { useState } from "react";
import tokenService from "../../utils/tokenService";

export default function Activity({randomActivity}) {

    console.log('Activity function running', randomActivity)
    const difficultyPercent = randomActivity.accessibility * 100
    
    let priceFree = false;
    const pricePercent = randomActivity.price * 100
    if (pricePercent === 0) {priceFree = true}

    function handleClick(e) {
        e.preventDefault(); 
        console.log(e)
        addActivity(randomActivity);
       
    }

    // (C)RUD - creating the random activity within the database with the user who selected it
    async function addActivity(activityData) {
        console.log('activityData ====>', activityData)
        try{
            // HTTP request going to the server
            const response = await fetch("/api/activities", {
                method: "POST",
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify(activityData)
            });
            const data = await response.json();
            // The HTTP cycle is complete and we're passing parsed response to server
            console.log("This is the response from the server=====>", data)
  
        } catch (err) {
            console.log(err);
        }
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
                            ? <h1>This activity is free!!!</h1> 
                            : <h3>$$Cost$$
                                <Progress percent={pricePercent} color="green"/>
                            </h3>}
                        </>
                        <Button color="blue" type="submit">Accept Activity</Button>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
    )
}