import { Box, HStack, Heading, Text, textDecoration } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function Navbar() {
  const router = useRouter();

  return (
    <Box py={4}>
      <HStack
        gap={10}
        py={2}
        px={24}
        alignItems="center"
        borderBottom="1px"
        borderColor="gray.300"
      >
        <Heading
          as="h3"
          size="lg"
          whiteSpace="nowrap"
          pr={8}
          borderRight="1px"
          borderColor="gray.300"
        >
          E - Books
        </Heading>
        <HStack gap={10}>
          <Link href={'/'}>
            <Text
              _hover={{
                textDecoration: 'underline',
              }}
              color={router.pathname === '/' ? 'blue.500' : 'black'}
              fontSize="xl"
              fontWeight="semibold"
            >
              Search
            </Text>
          </Link>
          <Link href={'/wishlist'}>
            <Text
              _hover={{
                textDecoration: 'underline',
              }}
              color={router.pathname === '/wishlist' ? 'blue.500' : 'black'}
              fontSize="xl"
              fontWeight="semibold"
            >
              Wishlist
            </Text>
          </Link>
        </HStack>
      </HStack>
    </Box>
  );
}
