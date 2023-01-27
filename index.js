const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const Property = mongoose.model(
  "Property",
  new mongoose.Schema({
    bedrooms: Number,
    bathrooms: Number,
    price: Number,
    area: Number,
    address: String,
    image: String,
  })
);

const typeDefs = `
  type Query {
    properties: [Property]
  }
  type Property {
    _id:String
    bedrooms: Int
    bathrooms: Int
    price: Int
    area: Int
    address: String
    image: String
  }
  type Mutation {
    addProperty(
      bedrooms: Int!
      bathrooms: Int!
      price: Int!
      area: Int!
      address: String!
      image: String!
    ): Property
  }
`;
const resolvers = {
  Query: {
    properties: async () => {
      return await Property.find();
    },
  },
  Mutation: {
    addProperty: async (
      _,
      { bedrooms, bathrooms, price, area, address, image }
    ) => {
      const property = new Property({
        bedrooms,
        bathrooms,
        price,
        area,
        address,
        image,
      });
      return await property.save();
    },
  },
};

const port = process.env.PORT || 4000;

mongoose
  .connect(
    "mongodb+srv://faisal:faisal@cluster0.ascfltx.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    const server = new ApolloServer({ typeDefs, resolvers });
    server.listen({ port }).then(({ url }) => {
      console.log(`Server ready at ${url}`);
    });
  });
