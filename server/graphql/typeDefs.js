const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    name: String!
    issues: [Issue]
    comments: [Comment]
  }

  type Issue {
    id: ID!
    title: String
    author: User
    description: String
    imgURL: String
    upvotes: [Vote]
    downvotes: [Vote]
    comments: [Comment]
  }

  type Comment {
    author: User
    message: String
  }

  type Vote {
    author: User
    issue: Issue
    direction: Boolean
  }

  type AuthData {
    id: ID!
    token: String!
    tokenExpiration: Int!
  }

  type Query {
    issues: [Issue]
    issue_single(id: String) : Issue
    issues_user(id: String) : [Issue]
    login(email: String, password: String) : AuthData!
    get_user: User
  }
  type Mutation {
      createIssue(title:String, author:String, description: String, imgURL: String, upvotes: String, downvotes: String) : [Issue]
      deleteIssue(title: String) : String
      createUser(email: String, password: String, name: String): AuthData!
      createComment(author: String, issue: String, message: String): String
      vote(author: String, issue: String, direction: Boolean): Vote
  }
`;

module.exports = {
    typeDefs
}