import { useEffect, useState } from "react";
import { Button, Item, Progress, Card } from "semantic-ui-react";

// ========== Function RandomActivityCard completes the API call to get anti-boredom activities ===========
export default function RandomActivityCard({addActivity}) {
    const [loading, setLoading] = useState(true);
    const [randomActivity, setRandomActivity] = useState({})
    const [count, setCount] = useState(0)
    
    // API call to the Boredom API
    useEffect(() => {
        const endPoint = `http://www.boredapi.com/api/activity/`
        async function getActivity() {
            try {
                setLoading(true);
                const response = await fetch(endPoint);
                const body = await response.json();
                setRandomActivity(body);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        getActivity();
    }, [count]);

    // updates API difficulty to an actual percent
    const difficultyPercent = randomActivity.accessibility * 100
    
    // updates API price to an actual percent and checks for free activities
    let priceFree = false;
    const pricePercent = randomActivity.price * 100
    if (pricePercent === 0) {priceFree = true}

    function handleClick(e) {
        e.preventDefault(); 
        addActivity(randomActivity);
    }

    // renders each activity on the page for the user to review and choose to select or get another
    return (
        <Card>
            <Button color="red" onClick={() => setCount(count + 1)}>
                Get Random Activity
            </Button>
            <Item.Group>
                <Item onClick={handleClick}>
                    <Item.Content>
                        <Item.Header as='a'>And your activity is...</Item.Header>
                        <h2 style={{color:"red"}}>{randomActivity.activity}</h2>
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
                        <Button color="red" type="submit">Accept Activity</Button>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Card>
    )
}