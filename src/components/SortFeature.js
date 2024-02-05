import { IconButton, Menu, MenuButton } from "@chakra-ui/react";
import {
  StarIcon,
  TimeIcon,
  TriangleDownIcon,
  TriangleUpIcon
} from "@chakra-ui/icons";

export const SortFeature = ({ sortOption, setSortOption }) => {
  return (
    <IconButton
      position="absolute"
      top="10px"
      right="10px"
      colorScheme="purple"
      borderRadius="lg"
      p="2"
      aria-label={sortOption.longName}
      icon={sortOption.shortName == "pushed_at"
        ? <><TimeIcon /><TriangleUpIcon ml="1" /></>
        : <><StarIcon /><TriangleDownIcon ml="1" /></>}
      onClick={() => {
        setSortOption(
          sortOption.shortName == sortOptions[0].shortName ? sortOptions[1] : sortOptions[0]
        );
      }}
    />
  );
};

export const sortOptions = [
  { shortName: "pushed_at", longName: "Mas reciente" },
  { shortName: "stargazers_count", longName: "Mas estrellas" },
];
