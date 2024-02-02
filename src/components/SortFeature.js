import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

export const SortFeature = ({ sortOption, setSortOption }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        colorScheme="purple"
        borderRadius="lg"
        p="3"
        minW="fit-content"
      >
        <Text as="span" color="whiteAlpha.800">
          Ordenar por:
        </Text>{" "}
        {sortOption.longName}
      </MenuButton>
      <MenuList>
        {sortOptions.map((option) => (
          <MenuItem
            key={option.shortName}
            fontSize="2xl"
            onClick={() => {
              setSortOption(
                sortOptions.find((o) => o.shortName === option.shortName),
              );
            }}
          >
            <Text>{option.longName}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export const sortOptions = [
  { shortName: "pushed_at", longName: "Mas reciente" },
  { shortName: "stargazers_count", longName: "Mas estrellas" },
];
