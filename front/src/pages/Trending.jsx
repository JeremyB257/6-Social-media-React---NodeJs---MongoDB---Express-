import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { UidContext } from '../components/AppContext';
import LogPage from './LogPage';
import { useSelector } from 'react-redux';
import LeftNav from '../components/LeftNav';
import { isEmpty } from '../components/Utils';
import Card from '../components/Post/Card';
import Trends from '../components/Trends';

const Trending = () => {
  const uid = useContext(UidContext);
  const trendList = useSelector((state) => state.trendingReducer);

  return uid ? (
    <>
      <Navbar />
      <div className="trending-page">
        <LeftNav />
        <div className="main">
          <ul>{!isEmpty(trendList[0]) && trendList.map((post) => <Card post={post} key={post._id} />)}</ul>
        </div>
        <div className="right-side">
          <div className="right-side-container">
            <Trends />
          </div>
        </div>
      </div>
    </>
  ) : (
    <LogPage />
  );
};

export default Trending;
