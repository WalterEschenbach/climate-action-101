import './App.css';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import {Routes, Route, Navigate} from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import ClimateActionSingle from './components/home/climate-action-single/ClimateActionSingle'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';
import NewIssue from './components/new/NewIssue';
import { AuthProvider } from './contexts/AuthContext';
import MyIssues from './components/issues-user/MyIssues';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      return alert(`Graphql error ${message}`);
    });
  if (networkError) {
      return alert(`Network error ${networkError}`);
    };
  }
});

export const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4000/graphql" }),
]);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});



function App() {
  return (
   <ApolloProvider client={client}>
     <AuthProvider>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route path="/" element={<Navigate to="/login" />}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/issue/:id" element={<ClimateActionSingle />}/>
          <Route path="/issue/new" element={<NewIssue />}/>
          <Route path="/issue/my" element={<MyIssues />}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
     </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
