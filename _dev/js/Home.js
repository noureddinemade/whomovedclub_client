import React from 'react';
import Routes from './Routes'
import Info from './Layout/Info';
import Footer from './Layout/Footer';
import Navigation from './Layout/Navigation';

//

const Home = props => {

    return (

        <main>

            <Info />

            <section className="content">

                <Navigation {...props} />
                <Routes {...props} />

            </section>

            <Footer />

        </main>

    )

}

export default Home;