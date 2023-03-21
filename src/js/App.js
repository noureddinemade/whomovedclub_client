import React, { Component, useState } from 'react';

import Loading from './components/Loading';
import Header from './components/Header';
import Footer from './components/Footer';
import Transfers from './components/Transfers';

import transferData from './components/Data/transfers.json';
import teamData from './components/Data/teams.json';

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
            loading: true

        };
        
    };

    //


    actions = {

        isDuplicate: (current, list) => {

            if (list.length > 0) {

                const result = list.filter(a => a === current);
            
                if (result.length > 0) {
            
                    return true;
            
                }

                else {

                    return false;

                }

            }

            else {

                return false;

            }
        
        },

        duplicate: (current, list) => {

            let result = false;

            if (list && list.length > 0) {

                for (let i = 0; i < list.length; i++) {

                    let count = 0;

                    for (let key in list[i]) {

                        if (list[i][key] === current[key]) {

                            count++;

                        }

                    }

                    if (count >= 5) {

                        result = true;

                    }

                };

            }

            return result;
            
        }

    }

    //

    async getData () {
        
        let countries   = [];
        let leagues     = [];
        let teams       = [];
        let transfers   = [];

        try {

            // const dateURL           = await fetch('http://api.whomoved.club/date');
            // const teamsURL          = await fetch('http://api.whomoved.club/teams');
            // const transfersURL      = await fetch('http://api.whomoved.club/transfers');

            // let teamsResult         = await teamsURL.json();
            // let transfersResult     = await transfersURL.json();
            // let dateResult          = await dateURL.json();

            let teamsResult             = teamData;
            let transfersResult         = transferData;

            transfersResult = await transfersResult.sort((a,b) => new Date(b.date) - new Date(a.date));

            // Get countries, leagues & teams
            // eslint-disable-next-line array-callback-return
            teamsResult.map(t => {

                let cDuplicate = this.actions.isDuplicate(t.country, countries);
                let lDuplicate = this.actions.isDuplicate(t.league, leagues);
                let tDuplicate = this.actions.isDuplicate(t.name, teams);

                if (!cDuplicate) countries.push(t.country);
                if (!lDuplicate) leagues.push(t.league);
                if (!tDuplicate) teams.push(t);
                
            });

            // Get transfers
            // eslint-disable-next-line array-callback-return
            transfersResult.map(t => {

                let duplicate = this.actions.duplicate(t, transfers);

                if (!duplicate) transfers.push(t);
                
            });

            this.setState({

                countries: countries,
                leagues: leagues,
                teams: teams,
                transfers: transfers,
                lastUpdated: new Date(),
                loading: false

            })


        } catch(error) {

            return error;

        }

    }

    //

    componentDidMount() {

        this.getData();

    }

    //

    render() {

        if (!this.state.loading) {

            return (

                <main>
    
                    <Header />

                    <Transfers state={this.state} action={this.actions} />
    
                    <Footer />
    
                </main>
                        
    
            )

        }

        else {

            return <Loading />

        }

    };

};

export default App;