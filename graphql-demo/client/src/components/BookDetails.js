import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';
import { Divider } from 'antd';
import './styles.scss';

const BookDetails = (props) => {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { bookId: props.bookId },
  });

  const { book } = data || {};

  if (loading) return console.log('Loading...');;
  if (error) return `Error! ${error.message}`;

  if(book){
    return(
      <ul className="bookDetails">
        <Divider>Book Name</Divider>
          <li>{book?.name}</li>
        <Divider>Author Name</Divider>
          <li>{book?.author?.name}</li>
        <Divider>Genre</Divider>
          <li>{book?.genre}</li>
        <Divider>All Books</Divider>
          {
            book?.author?.books.map((item)=> (
              <li key={item.id}>{item.name}</li>
            ))
          }
      </ul>
    )
  }

};

export default BookDetails;
