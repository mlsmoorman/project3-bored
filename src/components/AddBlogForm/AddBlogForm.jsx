import { useState } from 'react'
import { Button, Form, Segment, Dropdown } from "semantic-ui-react"

export default function AddBlogForm({activities}) {
    const [blog, setBlog] = useState('');
    const [photo, setPhoto] = useState('');

    return (
        <Segment>
            <Form>
                <h2></h2>
                <Form.Input placeholder="Activity"/>
                <Form.Input placeholder="BlogPost"/>
                <Form.Input type='file'/>
                <Button>Add Post</Button>
            </Form>
        </Segment>
    )

}