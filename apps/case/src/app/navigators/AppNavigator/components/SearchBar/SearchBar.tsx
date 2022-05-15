import { Heading, Input, VStack, Icon } from 'native-base';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export const SearchBar = () => {
  return (
    <VStack w="100%" space={3} alignSelf="center">
      <Input
        placeholder="Search Location & Places"
        width="80%"
        borderRadius="10"
        px="3"
        left="4"
        fontSize="14"
        isDisabled={true}
        InputLeftElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            color="gray.400"
            as={<MaterialIcon name="search" />}
          />
        }
        InputRightElement={
          <Icon
            m="2"
            mr="3"
            size="6"
            color="gray.400"
            as={<MaterialIcon name="mic" />}
          />
        }
      />
    </VStack>
  );
};
