import React, { useRef, useState } from 'react';
import { TextField, Button, IconButton, Typography, Fade, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

const NoteEditor = ({ note , setNote, placeholde="Add addational note" }) => {
  
  const [isEditing, setIsEditing] = useState(false);    
  const previousNOte= useRef(note)
  const handleAddNote = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setNote(previousNOte.current)
    setIsEditing(false);
  };

  return (
    <Box sx={{ position: 'relative', marginTop: 2 }}>
      {!note && !isEditing && (
        <Fade in={!note && !isEditing} timeout={300}>
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleAddNote}>
              <AddIcon />
            </IconButton>
            <Typography variant="body2">Add Note</Typography>
          </Box>
        </Fade>
      )}

      {isEditing ? (
        <Fade in={isEditing} timeout={300}>
          <Box sx={{flexDirection:'row', display:'flex'}}>
            <TextField
              label="Additional Note"
              id="outlined-size-small"
              multiline
              placeholder={placeholde}
              fullWidth
              value={note}
              onChange={(e) => setNote(e.target.value)}
              
            />
            <IconButton onClick={handleCancelEdit}>
              <CancelIcon />
            </IconButton>
          </Box>
        </Fade>
      ) : (
        note && (
          <Fade in={!isEditing && !!note} timeout={300}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="body2">{note}</Typography>
              <IconButton onClick={() => setIsEditing(true)}>
                <EditIcon />
              </IconButton>
            </Box>
          </Fade>
        )
      )}
    </Box>
  );
};

export default NoteEditor;
