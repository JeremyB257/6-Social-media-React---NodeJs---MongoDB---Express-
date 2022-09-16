import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogPage from './pages/LogPage';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Trending from './pages/Trending';
import axios from 'axios';
import { UidContext } from './components/AppContext';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_PUBLIC_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log('No token'));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="*" element={<LogPage />} />
        </Routes>
      </BrowserRouter>
    </UidContext.Provider>
  );
};

export default App;
