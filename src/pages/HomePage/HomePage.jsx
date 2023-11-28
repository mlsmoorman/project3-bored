import { Segment, Card } from "semantic-ui-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import GetRandomActivity from "../../components/Activity/Activity";
import ActivitiesPage from "../ActivitiesPage/ActivitesPage";

export default function HomePage() {
    const [type, setType] = useState('');


    console.log(type)


    return (
    <Segment>
        <h1>Welcome to BoredNoMore</h1>
        <h2>Are you bored and frustrated that you have run out of ideas on what to do next?</h2>  
        <h3>If your answer is yes, this is the app for you!</h3>
        <h4>Just choose the link above to select a random activity and you're 
        off to the races!!!  ENJOY!! </h4>
            <Card.Group itemsPerRow={3}>
                <Card onClick={() => setType('charity')} image={'https://i.imgur.com/zJUPYuZ.jpg'}/>
                <Card onClick={() => setType('busywork')} image={'https://i.imgur.com/nxHc7SV.png'}/>
                <Card onClick={() => setType('social')} image={'https://i.imgur.com/4B7YWWF.jpg'}/>
                <Card onClick={() => setType('cooking')} image={'https://i.imgur.com/Pj9bvaM.jpg'}/>
                <Card onClick={() => setType('education')} image={'https://i.imgur.com/GD2tLmo.jpg'}/>
                <Card onClick={() => setType('relaxation')} image={'https://i.imgur.com/CEJKOJy.jpg'}/>
                <Card onClick={() => setType('music')} image={'https://i.imgur.com/qxXYsgf.jpg'}/>
                <Card onClick={() => setType('diy')} image={'https://i.imgur.com/2kOmJ5j.jpg'}/>
                <Card onClick={() => setType('recreational')} image={'https://i.imgur.com/OuUo5o7.jpg'}/>
            </Card.Group>
    </Segment>  
    )
}