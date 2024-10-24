import React, { useState } from 'react';
import BugList from './BugList';
import TaskToolbar from '../../common/TaskToolbar';
import { useTheme } from '@emotion/react';

const bugsData = [
  { id: 1, title: 'API Timeout Issue', status: 'Open', reporter: { name: 'Alice' }, timestamp: new Date() },
  { id: 2, title: 'UI Bug in Dashboard', status: 'Closed', reporter: { name: 'Bob' }, timestamp: new Date() },
  { id: 3, title: 'UI Bug in Dashboard', status: 'Closed', reporter: { name: 'Bob' }, timestamp: new Date() },
  { id: 4, title: 'UI Bug in Dashboard', status: 'Closed', reporter: { name: 'Bob' }, timestamp: new Date() },
];

const BugPage = () => {
  const [selectedBug, setSelectedBug] = useState(null);

  const theme = useTheme();
  const handleBugSelect = (bug) => {
    setSelectedBug(bug);
    console.log('Selected Bug:', bug); // This could trigger a navigation to the details page
  };

  return (
    <div style={{backgroundColor: theme.palette.background.default, minHeight: 700,}}>
          <TaskToolbar setState={false} backenabled={true}/>
      <BugList bugs={bugsData} onBugSelect={handleBugSelect} />
    </div>
  );
};

export default BugPage;
