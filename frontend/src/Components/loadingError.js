import React from "react";

function LoadingIndicator(props) {
    return <p>{props.loadingMessage}</p>;
  }
  
  function ErrorHandler(props) {
    return <div>Error: {props.errorMessage}</div>;
  }

  export { ErrorHandler, LoadingIndicator };