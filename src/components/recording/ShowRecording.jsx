import React from 'react';
import Modal from 'react-modal';
import './Recording.css';
import axios from 'axios';

const ShowRecording = (props) => {

  const {isOpen, onClose, title, date, uploadDate, uploadTime, url, id, listOfRecordings, setListOfRecordings} =props

  const handleDelete = () => {
    axios
    .delete(`https://record-diary.herokuapp.com/api/mydiary/${id}`)
    .then((response) => {
      const deletedList = listOfRecordings.filter((record) => record._id !== response.data.file._id);
         setListOfRecordings(deletedList)
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
     <button onClick={handleDelete} className='delete-btn'>Delete</button>
    </Modal>
  )
}

export default ShowRecording;