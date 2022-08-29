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

        isDuplicate: (current, list) => {

            const result = list.filter(a => a === current);
        
            if (result.length > 0) {
        
                return true;
        
            }
        
        }

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
            let dateResult          = await dateURL.json();

            transfersResult = await transfersResult.sort((a,b) => new Date(b.date) - new Date(a.date));

            // Get countries, leagues & teams
            // eslint-disable-next-line array-callback-return
            teamsResult.map(t => {

                let cDuplicate = this.actions.isDuplicate(t.country, countries);
                let lDuplicate = this.actions.isDuplicate(t.league, leagues);
                let tDuplicate = this.actions.isDuplicate(t.name, teams);

                if (!cDuplicate) countries.push(t.country);
                if (!lDuplicate) leagues.push(t.league);
                if (!tDuplicate) teams.push(t.name);
                
            });

            // Get transfers
            // eslint-disable-next-line array-callback-return
            transfersResult.map(t => {

                let name = this.actions.isDuplicate(t.name, transfers);
                let team = this.actions.isDuplicate(t.team, transfers);
                let type = this.actions.isDuplicate(t.type, transfers);
                let date = this.actions.isDuplicate(t.date, transfers);

                if (!name && !team && !type && !date) transfers.push(t);
                
            });

            this.setState({

                countries: countries,
                leagues: leagues,
                teams: teams,
                transfers: transfers,
                lastUpdated: dateResult[0].date,
                filters: [],
                filtering: false,
                loading: true

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