import React from 'react';

import Info from './Layout/Info';
import Footer from './Layout/Footer';
import Navigation from './Layout/Navigation';
import Transfers from './Transfers';

//

const Home = props => {
    

    return (

        <main>

            <Info reset={props.updateFilter}/>

            <section className="content">

                <Navigation {...props} />
                <Transfers {...props} />

            </section>

            <Footer />

        </main>

    )

}

export default Home;