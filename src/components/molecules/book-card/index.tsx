import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import { Rating } from '@smastrom/react-rating';
import { FiHeart } from 'react-icons/fi';
import brokenImg from '@assets/images/broken-img.png';

type BookCardProps = {
  image_url: string;
  title: string;
  author: string;
  rating: number;
  onWishlist?: () => void;
  isWishlist?: boolean;
};

export default function BookCard({
  image_url,
  title,
  author,
  rating,
  onWishlist = () => {},
  isWishlist = false,
}: BookCardProps) {
  return (
    <Card maxW="sm">
      <CardBody>
        <Box position="relative" height={250}>
          <Image layout="fill" src={image_url || brokenImg} alt="Hero" />
        </Box>
        <Stack mt="6" spacing="3">
          <Heading size="md" noOfLines={2} minH={18} title={title}>
            {title}
          </Heading>
          <Text>{author || 'unknow'}</Text>
          <HStack justifyContent="space-between" alignItems="center">
            <Rating
              style={{
                width: '50%',
              }}
              readOnly
              value={rating || 0}
            />
            {!isWishlist ? (
              <Button onClick={onWishlist} rounded="full">
                <FiHeart />
              </Button>
            ) : null}
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
}
