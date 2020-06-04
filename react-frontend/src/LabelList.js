import React from "react";
import Badge from "react-bootstrap/Badge";

const LabelList = (props) => {
  const labels = (props.labels || []).map((label, index) => {
    return (
      <Badge key={index} variant="dark" className="mr-2">
        {label}
      </Badge>
    );
  });
  return <>{labels}</>;
};

export default LabelList;
