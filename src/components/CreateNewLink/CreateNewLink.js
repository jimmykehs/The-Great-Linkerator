import React, { useState } from 'react';
import { createLink } from '../../api';
import { Button, TextField } from '@material-ui/core'
import './CreateNewLink.css'

const CreateNewLink = () => {
    const [name, setName] = useState()
    const[url, setUrl] = useState()
    const [comment, setComment] = useState()
    const [tags, setTags] = useState([])

    
    const onCreateNewLinkSubmit = (event) => {
        event.preventDefault()
        createLink(url, comment, tags)
    }

    return (
        <div id="main">
         <form id="form" noValidate autoComplete="off" onSubmit={onCreateNewLinkSubmit}>
            <TextField 
                id="name" 
                label="name"
                onInput={(event) => {
                    setName(event.target.value);
                }} 
            />
            <TextField 
                id="url" 
                label="url"
                onInput={(event) => {
                    setUrl(event.target.value);
                }} 
            />
            <TextField 
                id="comment" 
                label="comment"
                onInput={(event) => {
                    setComment(event.target.value);
                }} 
            />
            <TextField 
                id="tags" 
                label="tags"
                onInput={(event) => {
                    setTags(event.target.value);
                }} 
            />
        <Button type="submit">Create Link</Button>
      </form>
    </div>
  )
}

export default CreateNewLink