import React, { useCallback, useContext, useEffect, useState } from 'react';
import BugList from './BugList';
import TaskToolbar from '../../common/TaskToolbar';
import { useTheme } from '@emotion/react';
import { DeleteRequestJson, GetRequest } from '../../Network/ApiRequests';
import { ApiUrls } from '../../Network/ApiUrls';
import { UserContext } from '../../context/MyContext';
import { useLocation, useNavigate } from 'react-router-dom';


const BugPage = () => {

  const location = useLocation();
  const { pid } = location.state;

  const [selectedBug, setSelectedBug] = useState(null);
  const [bugsData, setBugsData] = useState([]);
  const { token, mUser } = useContext(UserContext);
   const theme = useTheme();
  const navigate = useNavigate();



  const getBugs = useCallback(() => {
    GetRequest(
      ApiUrls.getBug+pid,
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
  },[pid]);


  const handleBugSelect = (bug) => {
    setSelectedBug(bug);
    navigate("/bug-info",{
        state: {selectedBug: bug },
    })
   
  };


useEffect(()=>{
  getBugs();
},[])
const DeleteBug = (id) => {
  DeleteRequestJson(
    ApiUrls.deleteBug + id,
    {},
    null,
    token,
    null,
    null,
    (res) => {
      getBugs();
    },
    null
  );
};

  return (
    <div style={{backgroundColor: theme.palette.background.default, minHeight: 700,}}>
          <TaskToolbar setState={false} backenabled={true}/>
      <BugList bugs={bugsData} onBugSelect={handleBugSelect} DeleteBug={DeleteBug} />
    </div>
  );
};

export default BugPage;
