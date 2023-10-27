import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import BooksIlustration from '@assets/images/book-search.jpeg';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import { BookType } from '../types/books';
import { createWishlist } from '@utils/services/wihslist';
import { toast } from 'react-toastify';
import { BookCard } from '@components/molecules';
import { MainLayout } from '@components/layout';
import Link from 'next/link';

const Homepage = () => {
  const router = useRouter();
  const { q } = router.query;
  const [keyword, setKeyword] = useState<string>('');
  const [books, setBooks] = useState<BookType[]>([]);

  const handleSearchBook = async () => {
    setBooks([]);
    setKeyword('');
    const res = await axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${q}`)
      .then((res) => res.data)
      .catch((err) => err.response.data);
    if (res.items.length) {
      setBooks(res.items);
    }
  };

  useEffect(() => {
    if (q) {
      handleSearchBook();
    }
  }, [q]);

  const handleAddToWishlist = async (book: BookType) => {
    try {
      const res = await createWishlist({
        book_id: book.id,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.length
          ? book.volumeInfo.authors[0]
          : '',
        image_url: book.volumeInfo.imageLinks?.thumbnail || '',
        rating: book.volumeInfo.averageRating || 0,
      });
      if (res.success) {
        toast.success(res.message || 'success add to wishlist');
      } else {
        throw res;
      }
    } catch (err) {
      toast.error(
        err?.data?.error || err?.statusText || 'Something went wrong'
      );
    }
  };

  return (
    <>
      {q ? (
        <>
          <Link href={'/'}>
            <Text mb={4}>&lt; Back</Text>
          </Link>
          <Grid templateColumns="repeat(5, 1fr)" gap={7}>
            {books.map((book: BookType, index: number) => (
              <GridItem key={index}>
                <BookCard
                  image_url={book.volumeInfo.imageLinks?.thumbnail || ''}
                  title={book.volumeInfo.title}
                  author={
                    book.volumeInfo.authors?.length
                      ? book.volumeInfo.authors[0]
                      : ''
                  }
                  rating={book.volumeInfo.averageRating}
                  onWishlist={() => handleAddToWishlist(book)}
                />
              </GridItem>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <HStack justifyContent="center">
            <Image width={300} src={BooksIlustration} alt="Hero" />
          </HStack>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push({
                pathname: '/',
                query: { q: keyword },
              });
            }}
          >
            <HStack mt={5}>
              <Input
                size={'lg'}
                placeholder="Search book"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button size={'lg'} type="submit" colorScheme="blue">
                Search
              </Button>
            </HStack>
          </form>
        </>
      )}
    </>
  );
};

Homepage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Homepage;
