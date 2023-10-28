import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import './app.css';

// const httpLink = createHttpLink({
//     uri: '/graphql',
//   });

function App() {
    return (
        <div>
            <Header />
            <Body />
            <Footer />
        </div>
    );
};

export default App;