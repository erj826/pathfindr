import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const PathfindrContainer = () => {
  const [domContent, setDomContent] = useState("");

  const getContent = () => {
    chrome.tabs.getSelected(null, function (tab) {
      chrome.tabs.sendRequest(
        tab.id,
        { action: "fetchDOM" },
        function (response) {
          setDomContent(response.dom);
        }
      );
    });
  };

  return (
    <Box textAlign="center" color="primary">
      <Typography variant="h3" gutterBottom>
        Pathfindr
      </Typography>
      <Button onClick={() => getContent()} variant="contained">
        Click here
      </Button>
      <Typography variant="h3">{domContent}</Typography>
    </Box>
  );
};

export default PathfindrContainer;
