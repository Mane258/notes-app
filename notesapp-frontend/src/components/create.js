import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios'


export default function Create() {
    const navigate = useNavigate()
    const [note, setNote] = useState('')

    // after succesful save to backend, navigate user back to list.

    const postNote = () => {
        axios.post(`http://localhost:3002/notes`, {
            note
        }).then(() => {
            navigate('/')
        })
    }
    // returning an input, add note and notelist button.
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Create Note</label>
                    <input autoFocus placeholder='New Note' value={note} onChange={(e) => setNote(e.target.value)} />
                </Form.Field>
                <Button onClick={postNote} type='submit'>Add Note</Button>
                <Link to='/'>
                    <Button>Notelist</Button>
                </Link>
            </Form>
        </div>
    )
}