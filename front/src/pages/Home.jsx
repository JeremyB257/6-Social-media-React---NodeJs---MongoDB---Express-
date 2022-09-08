import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import LeftNav from '../components/LeftNav';
import { UidContext } from '../components/AppContext';
import LogPage from './LogPage';
import Tread from '../components/Tread';
import NewPostForm from '../components/Post/NewPostForm';
import Trends from '../components/Trends';

const Home = () => {
  const uid = useContext(UidContext);

  return uid ? (
    <>
      <Navbar />
      <div className="home">
        <LeftNav />
        <div className="main">
          <div className="home-header">
            <NewPostForm />
          </div>
          <Tread />
        </div>
        <div className="right-side">
          <div className="right-side-container">
            <div className="wrapper">
              <Trends />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <LogPage />
  );
};

export default Home;
