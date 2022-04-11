const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// var books = [
//   { id: '1', name: 'The Secret', genre: 'Self-help book', authorId: "1" },
//   { id: '2', name: 'The Power', genre: 'Self-help book', authorId: "2" },
//   { id: '3', name: 'The Sucess', genre: 'Self-help book', authorId: "3" }
// ];
//
// var authors = [
//   { id: '1', name: 'John', age: 35 },
//   { id: '2', name: 'Hill', age: 25 },
//   { id: '3', name: 'Rock', age: 45 }
// ];

const BookType = new GraphQLObjectType({
  name:'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(perent, args){
        // return _.find(authors, {id:perent.authorId})
        return Author.findById(perent.authorId)
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name:'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(perent, args){
        // return _.filter(books, {authorId:perent.id})
        return Book.find({authorId: perent.id})
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(perent, args){
        // data from databse
        // return _.find(books, { id: args.id })
        return Book.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(perent, args){
        // return _.find(authors, { id: args.id })
        return Book.findById(args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(perent, args){
        // return books
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(perent, args){
        // return authors
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name:'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(perent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        })
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(perent, args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })
        return book.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
