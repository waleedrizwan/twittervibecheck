import React from "react";
import ToolTip from "react-bootstrap/ToolTip";

const VerifiedToolTip = (props) => {
  return (
    <Tooltip id="button-tooltip" {...props}>
      Verified Username
    </Tooltip>
  );
};

export default VerifiedToolTip;
