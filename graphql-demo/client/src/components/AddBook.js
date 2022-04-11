import React from 'react';
import { useQuery, useMutation  } from '@apollo/client';
import { getAuthorQuery, addBookMutation, getBooksQuery } from '../queries/queries';
import { Form, Input, Button, Select, Divider  } from 'antd';
import './styles.scss';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const AddBook = () => {
  const [form] = Form.useForm();

  const { loading, error, data } = useQuery(getAuthorQuery);
  const [ addBook ] = useMutation(addBookMutation,{
    update: (cache, { data: { addBook } }) => {
    const { books } = cache.readQuery({ query: getBooksQuery });
      cache.writeQuery({
       query: getBooksQuery,
       data: { books: books.concat([addBook]) },
     });
    },
  });

  if (loading) return console.log('Loading...');
  if (error) return `Error! ${error.message}`;

  const onFinish = (formValues) => {
    addBook({ variables:  formValues  });
    console.log("formValues",formValues);
    form.resetFields();
  };

  return(
    <div className="addBook">
    <Divider orientation="left">Add Book</Divider>
    <Form {...layout} form={form} onFinish={onFinish}>
      <Form.Item label="Book Name"name="name">
        <Input />
      </Form.Item>

      <Form.Item label="Genre"name="genre">
        <Input />
      </Form.Item>

      <Form.Item label="Authors"name="authorId">
        <Select placeholder = "Select Author">
          {
            data.authors.map((item)=>(
              <Option key={item.id}>{item.name}</Option>
            ))
          }
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}

export default AddBook;
