import React from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';
import { FormateDate } from '../../utill/Helper';

// Animation for connecting line
const growLine = keyframes`
  from {
    height: 0;
  }
  to {
    height: 100%;
  }
`;

const VerticalTimeline = ({ stages }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" position="relative" ml={2}>
      {stages.map((stage, index) => (
        <Box key={index} display="flex" flexDirection="row" alignItems="flex-start" position="relative"  sx={{}}>
          
          {/* Filled Circle for Each Stage */}
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: 'green',
              borderRadius: '50%',
              position: 'relative',
              zIndex: 1,
              mr: 2,
            }}
          />
          
          {/* Connecting Line */}
          {index < stages.length - 1 && (
            <Box
              sx={{
                position: 'absolute',
                left: '5px', // Aligns with the center of the circle
                top: 12, // Starts right below the circle
                height: 'calc(100% - 12px)', // Extends to the next item
                width: '2px',
                bgcolor: 'green',
                animation: `${growLine} 0.5s ease-out ${index * 0.5}s forwards`,
                transformOrigin: 'top',
                zIndex: 0,
              }}
            />
          )}
          
          {/* Status Details */}
          <Box sx={{marginTop:-1}}>
            <Typography variant="h6" fontWeight={'normal'}>
              {stage?.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={2}>
              {stage.date} {FormateDate(stage?.createdAt)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default VerticalTimeline;
