import { Segment, Grid, Form, Button } from "semantic-ui-react";
import GetRandomActivity from "../../components/GetRandomActivity/GetRandomActivity";
import UserActivities from "../../components/UserActivities/UserActivities";

export default function ActivitiesPage() {

    return (
        <Segment>
            <GetRandomActivity /> 
            <UserActivities />
        </Segment>
    )
        
    
}
