import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'semantic-ui-react'
import axios from 'axios'

export default function Read() {

    const [noteData, setNoteData] = useState([])

// storing id and data to localstorage to use it in update.js

    const updateData = (data) => {
        let { id, note } = data
        localStorage.setItem('ID', id)
        localStorage.setItem('Note', note)
    }

// sending delete request to backend and reload the data.

    const onDelete = (id) => {
        axios.delete(`http://localhost:3002/notes/${id}`)
            .then(() => {
                getData()
            })
    }

// get notes from backend and saving it to noteData.

    const getData = () => {
        axios.get(`http://localhost:3002/notes`)
            .then((getData) => {
                setNoteData(getData.data)
            })
    }

// get data from backend for showing it on list.

    useEffect(() => {
        axios.get(`http://localhost:3002/notes`)
            .then((response) => {
                setNoteData(response.data)
            })
    }, [])

// if notelist is empty, returning a message and a create button.

    if (noteData.length === 0) {
        return (
            <div>
            <div className="empty-list">Notelist empty.<br></br>
            Press Create to add a new note.</div>
            <br></br>
            <Link to='/create'>
                <Button>Create</Button>
            </Link>
            </div>
        )
    } else {

//  if not empty, returning a list of notes with create, update and delete button.

    return (
        <div>
            <Link to='/create'>
                <Button>Create</Button>
            </Link>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Notes</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {noteData.map((data, id) => {
                        return (
                            <Table.Row key={id}>
                                <Table.Cell>{data.note}</Table.Cell>
                                <Table.Cell>
                                    <Link to='/update'>
                                        <Button onClick={() => updateData(data)}>Update</Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
}

