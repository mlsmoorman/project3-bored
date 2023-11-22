import { Grid, Segment, Item, Progress, Button } from "semantic-ui-react"
import { useState } from "react";

export default function Activity({randomActivity}) {

    console.log('Activity function running', randomActivity)
    const difficultyPercent = randomActivity.accessibility * 100
    let priceFree = false;

    const pricePercent = randomActivity.price * 100
    if (pricePercent === 0) {priceFree = true}

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        
    }


    return (
        <Segment>
            <Item.Group>
                <Item onSubmit={handleSubmit}>
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