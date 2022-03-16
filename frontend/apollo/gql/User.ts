import { gql } from "@apollo/client";
export const GET_USERS = gql`
  query Users(
    $take: Int
    $skip: Int
    $order: String
    $sort: String
    $search: String
  ) {
    users {
      count
      docs(
        take: $take
        skip: $skip
        order: $order
        sort: $sort
        search: $search
      ) {
        email
        name
        _id
        type
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation UpsertUser($input: UserInput) {
    user(input: $input) {
      name
      _id
      email
      type
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($input: String!) {
    deleteUser(input: $input) {
      name
      _id
      email
      type
    }
  }
`;
