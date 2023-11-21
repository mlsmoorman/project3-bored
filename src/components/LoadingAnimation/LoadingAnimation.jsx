import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

export default function LoadingAnimation() {
  return (
    <div> 
      <Segment>
        <Dimmer active inverted>
          <Loader inverted>Fetching Activity</Loader>
        </Dimmer>
  
        <Image src='/images/wireframe/short-paragraph.png' />
      </Segment>
    </div>
  )
}