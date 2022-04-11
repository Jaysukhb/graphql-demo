import { gql } from '@apollo/client';

export const getAuthorQuery =gql`
{
  authors {
    name
    id
  }
}
`

export const getBooksQuery = gql`
  {
    books {
      name,
      id
    }
  }
`

export const addBookMutation = gql`
  mutation($name:String!, $genre:String!, $authorId:ID!){
    addBook (name:$name, genre:$genre, authorId:$authorId) {
      name,
      id
    }
  }
`

export const getBookQuery = gql`
  query($bookId:ID) {
    book(id:$bookId) {
      name,
      genre,
      author {
        id,
        name,
        books {
          name
          id
        }
      }
    }
  }
`
