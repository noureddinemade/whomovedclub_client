import React, { Component } from 'react';

import Loading from './Loading';
import Info from './Layout/Info';
import Footer from './Layout/Footer';

// This is me testing something

//

class App extends Component {

    constructor(props) {

        super(props)

        this.state = {

            countries: [],
            leagues: [],
            teams: [],
            transfers: [],
            lastUpdated: '',
            filters: [],
            filtering: false,
            loading: true

        };
        
    };

    //

    filters = {

    }

    actions = {

        

    }

    //

    async getData () {
        
        let countries   = [];
        let leagues     = [];
        let teams       = [];
        let transfers   = [];

        try {

            const dateURL           = await fetch('http://api.whomoved.club/date');
            const teamsURL          = await fetch('http://api.whomoved.club/teams');
            const transfersURL      = await fetch('http://api.whomoved.club/transfers');

            let teamsResult         = await teamsURL.json();
            let transfersResult     = await transfersURL.json();
            let dateResults         = await dateURL.json();

            transfersResult = await transfersResult.sort((a,b) => new Date(b.date) - new Date(a.date));

            // Get countries
            // eslint-disable-next-line array-callback-return
            teamsResult.map(() => {


                
            })


        } catch(error) {

            return error;

        }

    }

    //

    componentDidMount() {

        this.getData();

    }

    // ? <Home {...this.actions} {...this.state} display={this.filters.display} />

    //

    render() {

        return (

            <main>

                <Info reset={this.actions.updateFilter} loading={this.state.loading} filtering={this.state.filtering} />

                {
                    
                    !this.state.loading
                        ? <p>Loaded</p>
                        : <section className="content"> <Loading /> </section>

                }

                <Footer />

            </main>
                    

        )

    };

};

export default App;