import { useState } from 'react'
import { Button, Form, Segment } from "semantic-ui-react"

export default function AddBlogForm() {
    const [blog, setBlog] = useState('');
    const [photo, setPhoto] = useState('');

        

    return (
        <Segment>
            <Form>
                <Form.Input />
                <Form.Input />
                <Button></Button>
            </Form>
        </Segment>
    )

}