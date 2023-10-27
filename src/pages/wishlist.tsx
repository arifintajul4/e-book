import { Box, Grid, GridItem } from "@chakra-ui/react"
import { MainLayout } from "@components/layout"
import { BookCard } from "@components/molecules"
import { getWishlist } from "@utils/services/wihslist"
import React, { ReactElement } from "react"

export const getStaticProps = async () => {
  try {
    const books = await getWishlist()
    return { props: { books: books }, revalidate: 3 }
  } catch (err) {
    return { props: { books: [] } }
  }
}

export default function Wishlist({ books }) {
  return (
    <Box>
      <Grid templateColumns="repeat(5, 1fr)" gap={7}>
        {books.map((book, index) => (
          <GridItem key={index}>
            <BookCard
              image_url={book.image_url || ""}
              title={book.title}
              author={book.author}
              rating={book.rating}
              isWishlist={true}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}

Wishlist.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
