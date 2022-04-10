import {
    Box,
    Flex,
} from "@chakra-ui/react";
import React from "react";

const injectStyle = (style) => {
    const styleElement = document.createElement("style");
    let styleSheet = null;
    document.head.appendChild(styleElement);
    styleSheet = styleElement.sheet;
    styleSheet.insertRule(style, styleSheet.cssRules.length);
};

const Loading = () => {
    const keyframesStyle = `
        @keyframes sk-rotateplane {
          0% {
            transform: perspective(120px) rotateX(0deg) rotateY(0deg);
            -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
          } 50% {
            transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
            -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
          } 100% {
            transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
            -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
          }
        }
      `;

    injectStyle(keyframesStyle);
    return (
        <Flex alignItems="center" justifyContent="center" h="100%" w="100%">
            <Box
                style={{ animation: "sk-rotateplane 1.2s infinite ease-in-out" }}
                bg={'purple'}
                h="3em"
                w="3em"
            />
        </Flex>
    );
};

export default Loading;
