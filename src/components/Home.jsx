import React from 'react';
import { Link } from 'react-router-dom';
import hug from './hug.png';
import TypeWriter from './TypeWriter';

const Home = ({currentUser}) => {
  return (
    <div className="home">
      <h1 className='main-text'><TypeWriter text={`"Keep a diary, 
      and someday it'll keep you."`}/></h1>
      
      <img src={hug} className="hug" alt="hug" />
      {currentUser? <Link to={'/mydiary'}>Start</Link> :
      <Link to={'/auth/login'}>Start</Link>}
    </div>
  );
};

export default Home;
