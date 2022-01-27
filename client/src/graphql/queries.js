import { gql, useQuery } from "@apollo/client";

export const GET_ISSUES = gql`
  query {
    issues {
      title
      author{
        name
      }
      id
      description
      imgURL
      upvotes{
        issue{
          id
        }
      }
      downvotes{
        issue{
          id
        }
      }
    }
  }
`;
export const GET_ISSUES_USER = gql`
query GetIssuesUser($id: String){
  issues_user(id: $id) {
    title
    id
    description
    imgURL
    upvotes{
      issue{
        id
      }
    }
    downvotes{
      issue{
        id
      }
    }
    comments {
      message
      author {
        name
      }
    }
    author {
      name
    }
  }
}
`;

export const GET_ISSUE_SINGLE = gql`
  query GetIssue($id: String) {
    issue_single(id: $id) {
      title
      id
      description
      imgURL
      upvotes{
        issue{
          id
        }
      }
      downvotes{
        issue{
          id
        }
      }
      author {
        name
      }
      comments {
        author {
          name
        }
        message
      }
    }
  }
`;

export const LOGIN = gql`
  query Login($email: String, $password: String){
    login(email: $email, password: $password) {
      id
      token
      tokenExpiration
    }
  }
`;


export const GET_USER = gql`
  query{
    get_user{
      id
      email
      name
    }
  }
`;


export const useIssue = (id) => {
  const {data, error, loading} = useQuery(GET_ISSUE_SINGLE, {
    variables: {
      id
    }
  });

  return {data, error, loading};
}

export const GetIssuesUser = (id) => {
  const {data, error, loading} = useQuery(GET_ISSUES_USER, {
    variables: {
      id
    }
  });

  return {data, error, loading};
}

