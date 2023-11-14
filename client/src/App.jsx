import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import './app.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
  });

function App() {
    return (
        <ApolloProvider client = {client}>
        <div>
            <Body />
            <Footer />
        </div>
        </ApolloProvider>
    );
};

export default App;