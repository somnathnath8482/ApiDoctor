import React, { useContext, useEffect, useState } from 'react';
import BugList from './BugList';
import TaskToolbar from '../../common/TaskToolbar';
import { useTheme } from '@emotion/react';
import { GetRequest } from '../../Network/ApiRequests';
import { ApiUrls } from '../../Network/ApiUrls';
import { UserContext } from '../../context/MyContext';
import { useNavigate } from 'react-router-dom';

/* const bugsData = [
  { id: 1, title: 'API Timeout Issue', status: 'Open', reporter: { name: 'Alice' }, timestamp: new Date() },
  { id: 2, title: 'UI Bug in Dashboard', status: 'Closed', reporter: { name: 'Bob' }, timestamp: new Date() },
  { id: 3, title: 'UI Bug in Dashboard', status: 'Closed', reporter: { name: 'Bob' }, timestamp: new Date() },
  { id: 4, title: 'UI Bug in Dashboard', status: 'Closed', reporter: { name: 'Bob' }, timestamp: new Date() },
]; */

const BugPage = () => {
  const [selectedBug, setSelectedBug] = useState(null);
  const [bugsData, setBugsData] = useState([]);
  const { token, mUser } = useContext(UserContext);
   const theme = useTheme();
  const navigate = useNavigate();



  const getBugs = () => {
    GetRequest(
      ApiUrls.getBug+"10",
      {},
      null,
      token,
      null,
      null,
      (res) => {
       setBugsData(res?.data);
      },
      null
    );
  };


  const handleBugSelect = (bug) => {
    setSelectedBug(bug);
    navigate("/bug-info",{
        state: {selectedBug: bug },
    })
   
  };


useEffect(()=>{
  getBugs();
},[])


  return (
    <div style={{backgroundColor: theme.palette.background.default, minHeight: 700,}}>
          <TaskToolbar setState={false} backenabled={true}/>
      <BugList bugs={bugsData} onBugSelect={handleBugSelect} />
    </div>
  );
};

export default BugPage;
