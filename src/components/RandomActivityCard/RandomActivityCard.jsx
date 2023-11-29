import { useEffect, useState } from "react";
import { Button, Item, Progress, Card } from "semantic-ui-react";

// This is the activities page
// It will hold a random activity and a list of a users current activities

export default function Activity({addActivity}) {
    const [loading, setLoading] = useState(true);
    const [randomActivity, setRandomActivity] = useState({})
    const [count, setCount] = useState(0)
    
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

    // console.log('random activity ----> ', randomActivity)

    const difficultyPercent = randomActivity.accessibility * 100
    
    let priceFree = false;
    const pricePercent = randomActivity.price * 100
    if (pricePercent === 0) {priceFree = true}

    function handleClick(e) {
        e.preventDefault(); 
        addActivity(randomActivity);
    }

    return (
        <Card>
            <Button color="blue" onClick={() => setCount(count + 1)}>
                Get Random Activity
            </Button>
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
        </Card>
    )
}