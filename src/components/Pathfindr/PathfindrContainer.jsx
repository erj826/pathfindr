import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const PathfindrContainer = () => {
  const [domContent, setDomContent] = useState("");

  const getContent = () => {
    chrome.tabs.getSelected(null, function (tab) {
      chrome.tabs.sendRequest(
        tab.id,
        { action: "getDOM" },
        function (response) {
          setDomContent(response.dom);
        }
      );
    });
  };

  return (
    <Box textAlign="center">
      <Typography color="primary" variant="h3" gutterBottom component="h3">
        Pathfindr
      </Typography>
      <button onClick={() => getContent()}>Click here</button>
      <h5>{domContent}</h5>
    </Box>
  );
};

export default PathfindrContainer;
