import {
  Box,
} from "@chakra-ui/react";
import React from "react";

const injectStyle = (style) => {
  const styleElement = document.createElement("style");
  let styleSheet = null;
  document.head.appendChild(styleElement);
  styleSheet = styleElement.sheet;
  styleSheet.insertRule(style, styleSheet.cssRules.length);
};

const LoadingBar = () => {
  const keyframesStyle = `
        @keyframes loadingbar {
          0% {
            left: 0;
            transform: translateX(-210%);
            width: 10%;
          }
          100% {
            left: 210%;
            transform: translateX(0%);
            width: 100%;
          }
        }
  `;
  injectStyle(keyframesStyle);

  return (
    <Box
      animation="loadingbar 4s ease-in-out infinite"
      position='absolute'
      h="4px"
      w="150px"
      bg="purple"
    />
  );
};

export default LoadingBar;
