import { Box } from '@chakra-ui/react';
import { Navbar } from '@components/organism';
import Head from 'next/head';
import React from 'react';

export default function MainLayout({ children }) {
  return (
    <>
      <Head>
        <title>E-Books</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <Box px={24} pb={20} pt={5}>
        {children}
      </Box>
    </>
  );
}
