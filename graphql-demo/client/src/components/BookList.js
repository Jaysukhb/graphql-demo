import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries'
import { Tag, Divider } from 'antd';
import BookDetails from './BookDetails';
import './styles.scss'

const BookList = () => {
  const [bookData, setBookData] = useState(null);
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return console.log('Loading...');
  if (error) return `Error! ${error.message}`;

  return(
    <>
      <div className="bookList">
        <Divider orientation="left">Book List</Divider>
        {
          data.books.map((item)=>(
            <Tag
            color="blue"
            onClick={()=> {setBookData(item.id)}}
            key={item.id}
            >
              {item.name}
            </Tag>
          ))
        }
      </div>
      <div>
        <BookDetails bookId={bookData} />
      </div>
    </>
  )
};

export default BookList;
