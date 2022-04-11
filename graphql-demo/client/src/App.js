import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import BookDetails from './components/BookDetails';
import './App.css';
import 'antd/dist/antd.css';

function App() {

  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={client}>
      <div>
        <BookList />
        <AddBook />
        <BookDetails />
      </div>
    </ApolloProvider>
  );
}

export default App;
