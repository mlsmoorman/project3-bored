import { Card, Image, Container } from "semantic-ui-react"
import { useState } from "react"
import { Link } from "react-router-dom";


// This is the Home page
export default function HomePage() {
    const [type, setType] = useState('');
    
    return (
    <Container>
        <Image src="https://i.imgur.com/94MZOzLl.png" centered size="large"/>
        <h2>Are you bored and frustrated that you have run out of ideas on what to do next?</h2>  
        <h3>If your answer is yes, this is the app for you!</h3>
        <h1>Click {}
            <Link to={`/activity`}>
                 here {}
            </Link>
                 to choose a random activity now!
        </h1>

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
    </Container>  
    )
}