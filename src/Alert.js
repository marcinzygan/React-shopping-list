import React, { useEffect } from "react";

const Alert = ({ msg, type }) => {
  return <h2 className={`alert-${type}`}>{msg}</h2>;
};

export default Alert;
