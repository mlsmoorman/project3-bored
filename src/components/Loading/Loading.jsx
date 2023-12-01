import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

export default function Loading() {
    return (
        <Segment>
            <Dimmer active>
                <Loader size='large'>Curing Boredom</Loader>
            </Dimmer>
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
    )
}