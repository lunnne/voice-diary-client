import { useReactMediaRecorder } from 'react-media-recorder';
import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import Modal from 'react-modal';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import * as AiIcons from 'react-icons/ai';
import airplain from '../airplain.png'
import './Recording.css';

const AddRecording = ({ isOpen, onClose, setlistOfRecordings, listOfRecordings }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(moment());

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    type: 'audio/wav',
  });

  console.log(status);

  const handleSubmit = async (event) => {
    event.preventDefault();

    onClose();

    const audioBlob = await fetch(mediaBlobUrl).then((res) => res.blob());

    let newDate = date.format('YYYY-MM-DD');
    const filename = title + '|' + newDate;
    const audioFile = new File([audioBlob], `${filename}.wav`, { type: 'audio/wav' });
    const formData = new FormData(); // preparing to send to the server
    console.log(audioFile);
    console.log(title);

    formData.append('file', audioFile);
    formData.append('name', filename);

    axios({
      method: 'post',
      url: `https://record-diary.herokuapp.com/api/mydiary/create`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => setlistOfRecordings([...listOfRecordings, response.data]))
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={{
        overlay: {
          position: 'fixed',
          width:'100vw',
          height:'100vh',
          backgroundColor: '#f2f1ed',
          zIndex: 20,
        },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          height: '90%',
          border: '2px solid #444444',
          background: '#f5f5f5',
          // overflow: 'hidden',
          borderRadius: '2rem',
          outline: 'none',
        },
      }}
    >
      <div className="main-container">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="inner-container">
            <Datetime
              timeFormat={false}
              name="date"
              inputProps={{
                style: {
                  fontFamily: 'Quantico',
                  fontWeight: 700,
                  fontSize: 35,
                  height: '50px',
                  background: 'none',
                  border: 'none',
                },
              }}
              value={date}
              onChange={(date) => setDate(date)}
            />
            <section className="question-container">
              <h1>"What flower do you like most?"</h1>
            </section>

            <div className="status-btn">
              <AiIcons.AiFillAudio />
            </div>

            {status === 'stopped' && (
              <div className="audio-container">
                <audio src={mediaBlobUrl} controls />
              </div>
            )}
            <div className="form-group">
              <input
                type="text"
                name="title"
                id="title-text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>

            <div className="btn-container form-group">
              <button className="start-btn" type="button" style={{fontSize : '1rem'}} onClick={startRecording}>
                Start
              </button>
              <button className="stop-btn" type="button" style={{fontSize : '1rem'}} onClick={stopRecording}>
                Stop
              </button>
            </div>

            <button id="submit-btn" style={{ background: 'none' }}  type="submit">
          <img src={airplain} alt="stars" style={{ width : '50%'}}/>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddRecording;
