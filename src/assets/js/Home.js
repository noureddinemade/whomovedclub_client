import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes'
import Info from './Layout/Info';
import Footer from './Layout/Footer';
import Navigation from './Layout/Navigation';

//

const Home = props => {

    const { lastUpdated } = props;

    return (

        <Router>

            <Info />

            <section className="content">

                <Navigation {...props} />
                <Routes {...props} />

            </section>

            <Footer />

        </Router>

    )

}

export default Home;