const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();


const MONGO_URL = "mongodb+srv://radiha:12345@cluster0.ph0kk.mongodb.net/graphqldb?retryWrites=true&w=majority"

mongoose.connect(MONGO_URL, () => {
  console.log("Database connected");
});

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true
}))

app.listen(4000, ()=> {
  console.log("Now running app 4000")
});
