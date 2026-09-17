"use client";
import React from "react";
import dynamic from "next/dynamic";

const PopupButton = dynamic(() => import("react-calendly").then(mod => mod.PopupButton), {
  ssr: false,
});

const CalButton = () => {
  return (
    <PopupButton
      url="https://calendly.com/tribesforgood/discovery-call"
      /*
       * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
       * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
       */
      rootElement={typeof window !== "undefined" ? document.body : null}
      text="Schedule a call"
    />
  );
};

export default CalButton;
