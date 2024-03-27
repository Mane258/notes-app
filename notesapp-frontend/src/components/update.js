import React, { useState, useEffect } from 'react'
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Update() {
    const navigate = useNavigate();
    const [id, setID] = useState(null)
    const [note, setNote] = useState('')

// get note info from localstorage what user wants to update
    
    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setNote(localStorage.getItem('Note'))
    }, [])

// sending update data to backend, navigating to list.

    const updateNote = () => {
        axios.put(`http://localhost:3002/notes/${id}`, {
            note
        }).then(() => {
            navigate('/')
        })
    }

// form for updating the data.

    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Note</label>
                    <input autoFocus placeholder='Updated Note' value={note} onChange={(e) => setNote(e.target.value)} />
                </Form.Field>
                <Button onClick={updateNote} type='submit'>Update</Button>
            </Form>
        </div>
    )
}