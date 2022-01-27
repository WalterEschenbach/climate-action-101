import { gql, useMutation } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser(
    $email: String
    $password: String
    $name: String
    ) {
    createUser(
      email: $email 
      password: $password 
      name: $name 
      ) {
        id
        token
        tokenExpiration
    }
    }
`;

export const CREATE_ISSUE_MUTATION = gql`
  mutation CreateIssue(
    $title: String
    $author: String
    $description: String
    $imgURL: String
    ) {
    createIssue(
      title: $title 
      author: $author 
      description: $description 
      imgURL: $imgURL 
      upvotes: [Vote]
      downvotes: [Vote]
      ) {
      title : title
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment(
    $author: String
    $issue: String
    $message: String
    ) {
    createComment(
      author: $author
      issue: $issue
      message: $message 
    )
    }
`;

export const VOTE = gql`
  mutation Vote(
    $author: String
    $issue: String
    $direction: Boolean
    ) {
    vote(
      author: $author
      issue: $issue
      direction: $direction 
    ){
      issue {
        id
      }
    }
    }
`;

export const CreateUser = (email, password, name) => {
  const {data, error, loading} = useMutation(CREATE_USER_MUTATION, {
    variables: {
      email,
      password,
      name
    }
  });

  return {data, error, loading};
}

export const CreateIssue = (title, author, description, imgURL) => {
  const {data, error, loading} = useMutation(CREATE_ISSUE_MUTATION, {
    variables: {
      title,
      author,
      description,
      imgURL
    }
  });

  return {data, error, loading};
}

export const CreateIssueComment = (author, issue, message) => {
  const {data, error, loading} = useMutation(CREATE_COMMENT, {
    variables: {
      author,
      issue,
      message
    }
  });

  return {data, error, loading};
}