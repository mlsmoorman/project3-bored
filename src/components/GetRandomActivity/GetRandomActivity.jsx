import { useEffect, useState } from "react";
import { Segment, Button, Grid, Form } from "semantic-ui-react";
import Activity from "../Activity/Activity";

export default function GetRandomActivity() {
    const [loading, setLoading] = useState(true);
    const [randomActivity, setRandomActivity] = useState({})
    const [count, setCount] = useState(0)
    const [userActivities, setUserActivities] = useState({});

    // async function getActivity() {
    //     const endPoint = `http://www.boredapi.com/api/activity/`
    //     console.log('endPoint===============>', endPoint)
    //     try {
    //         setLoading(true);
    //         const response = await fetch(endPoint);
    //         const body = await response.json();

    //         console.log('body============>', body);

    //         setRandomActivity(body);
    //         setLoading(false);

    //     } catch (err) {
    //         console.log(err);
    //         setLoading(false);
    //     }
    // }


    useEffect(() => {
        console.log('USE EFFECT FOR RANDOM ACTIVITIES COMPONENT IS RUNNING');
        const endPoint = `http://www.boredapi.com/api/activity/`
        console.log('endPoint===============>', endPoint)

        async function getActivity() {
            try {
                setLoading(true);
                const response = await fetch(endPoint);
                const body = await response.json();

                console.log('body============>', body);

                setRandomActivity(body);
                setLoading(false);

            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        getActivity();
    }, [count]);




    return (
        <Segment>
            <Button onClick={() => setCount(count + 1)}>
            {/* <Button onClick={getActivity}> */}
                Get Random Activity
            </Button>
            <Activity randomActivity={randomActivity} />
        </Segment>
    )
}