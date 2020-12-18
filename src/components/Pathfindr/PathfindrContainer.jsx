import React from "react";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tree from './tree.jsx';
import {nodeRootMock} from './mockData.jsx'

const PathfindrContainer = () => (
  <Box textAlign="center">
    <Typography color="primary" variant="h3" gutterBottom component="h3">Welcome to Pathfindr</Typography>
    <Tree data={nodeRootMock}/>
  </Box>
);

export default PathfindrContainer;
