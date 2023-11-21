import { useState, useEffect } from "react"
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";

export default function ActivitiesPage() {
    const [activity, setActivity] = useState({});
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        console.log('USE EFFECT FOR ACTIVITIES PAGE IS RUNNING');
        const endPoint = `http://www.boredapi.com/api/activity?type=recreational`
        console.log('endPoint===============>', endPoint)
    
    async function getActivity() {
        try {
            setLoading(true);
            const response = await fetch(endPoint);
            const body = await response.json();

            console.log('body============>', body);

            let i = Math.floor(Math.random() * body.data.length-1);
            setActivity(body.data[i]);
            setLoading(false);

        } catch(err) {
            console.log(err);
            setLoading(false);
        }
    }
    getActivity();
    }, []);
    
    return (
        <>
            This is the Activity Page

        </>
    )
}