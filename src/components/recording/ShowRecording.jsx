import React from 'react';
import Modal from 'react-modal';
import './Recording.css';
import axios from 'axios';

const ShowRecording = (props) => {

  const {isOpen, onClose, title, date, uploadDate, uploadTime, url, id, deleteEvent} =props

  const handleDelete = (id) => {
    console.log(id);
    axios
    .delete(`https://record-diary.herokuapp.com/api/mydiary/${id}`)
    .then((response) => {
       console.log(response.data);
     
    })
    .catch((err) => {
      console.log(err); 
    });

    onClose()
  }
  
  
  
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false} style={{ overlay: { zIndex: 20 } }}>
    
     <div>title : {title}</div>
     <p>{date}</p>
     <p>{uploadDate}</p>
     <p>{uploadTime}</p>
     <p>{id}</p>
     <audio src={url} controls/>
     <button onClick={()=>handleDelete(id)} className='delete-btn'>Delete</button>
    </Modal>
  )
}

export default ShowRecording;