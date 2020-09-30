import React from 'react';

import Filters from './Layout/Filters';
import Transfers from './Transfers';

//

const Home = props => {
    

    return (     

        <section className="content">

            <Filters {...props} />
            <Transfers {...props} />

        </section>

    )

}

export default Home;