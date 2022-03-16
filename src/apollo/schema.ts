import { gql } from "apollo-server";

const UserFragemnt = `
_id: ID
name: String
email: String
type: Int
`;
export const TypeDef = gql`
  type User {
    ${UserFragemnt}
  }
  
  input UserInput {
    ${UserFragemnt}
    password: String
  }
  
  type UserResponse {
    docs(take: Int, skip: Int, sort:String , order: String,search: String): [User]
    count: Int
  }

  type Query {
    users: UserResponse
    user(_id: String!): User
  }

  type Mutation {
    user(input: UserInput): User
    deleteUser(input: String!): User
  }
`;
