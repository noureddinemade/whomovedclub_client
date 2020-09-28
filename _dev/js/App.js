import React, { Component } from 'react';

import Home from './Home';
import Loading from './Loading';

//

class App extends Component {

    constructor(props) {

        super(props)

        this.state = {

            nav: [],
            teams: [],
            transfers: [],
            lastUpdated: '',
            country: null,
            league: null,
            team: null,
            direction: null,
            filtered: [],
            loading: true,
            loadingMessages: []

        };
        
    };

    //

    filters = {

        country: (c = this.state.country, teams = this.state.teams) => {

            return c ? teams.filter(team => team.country === c) : teams;

        },

        league: (c = this.filters.country(), l = this.state.league) => {

            return l ? c.filter(team => team.league === l) : c;

        },

        team: (l = this.filters.league(), t = this.state.team) => {

            return t ? l.filter(team => team.teamID === t) : l;

        },

        display: (transfers = this.state.transfers, t = this.state.team, d = this.state.direction) => {

            let results = []

            if (t) {

                const filter = this.filters.team();

                // eslint-disable-next-line
                filter.map(t => {

                    if (d === 'in') {

                        // eslint-disable-next-line
                        transfers.filter(p => p.team.in.id === t.teamID).map(p => {

                            results.push(p);
    
                        })

                    }

                    else if (d === 'out') {

                        // eslint-disable-next-line
                        transfers.filter(p => p.team.out.id === t.teamID).map(p => {

                            results.push(p);
    
                        })

                    }

                })

            }

            else {

                const filter = this.filters.league();

                // eslint-disable-next-line
                filter.map(t => {

                    // eslint-disable-next-line
                    transfers.filter(p => p.team.in.id === t.teamID).map(p => {

                        results.push(p);

                    })

                })

            }


            return results.sort((a,b) => new Date(b.transferDate) - new Date(a.transferDate));

        }

    }

    actions = {

        isDuplicate: (current, list) => {

            const result = list.filter(a => a === current);
        
            if (result.length > 0) {
        
                return true;
        
            }
        
        },

        generateInfo: (t) => {

            let result;
            let cost = t.type.replace(' ', '');

            const name = t.name.includes('&apos;') ? t.name.replace('&apos;', "'") : t.name;
            const type = t.type === 'Loan' ? 'loaned' : 'transferred';

            t.type === 'Free' 
                ? cost = ' for free.'
                : t.type === 'Loan' ? cost = '.'
                : t.type.charAt(0) !== '€' ? cost = ` for €${cost}.`
                : cost = ` for ${cost}.`
            

            result = {

                name: name,
                cost: cost,
                type: type,
                date: t.transferDate

            }

            return result;

        },

        imWaiting: (count) => {

            const messages = ['Almost there','Just one more thing','Hold on please']

            if (this.state.loading) {

                this.setState(prevState => ({

                    loadingMessages: [...prevState.loadingMessages, messages[count]]
    
                }))

            }

        },

        updateFilter: (filter) => {

            this.setState({
    
                country:    filter && filter.c ? filter.c : null,
                league:     filter && filter.l ? filter.l : null,
                team:       filter && filter.t ? filter.t : null,
                direction:  filter && filter.d ? filter.d : null,
    
            })
    
        },

        count: (filters, transfers = this.state.transfers) => {
            
            const { c, l } = filters;

            const f1 = this.filters.country(c);
            const f2 = this.filters.league(f1, l);

            let count = 0;

            //eslint-disable-next-line
            f2.map(t => {

                count = count + transfers.filter(p => p.team.in.id === t.teamID).length;

            })

            return count;

        }

    }

    //

    async getData () {

        let transfers   = [];
        let teams       = [];

        try {

            const dateURL           = await fetch('https://whomovedclub.herokuapp.com/date');
            const teamsURL          = await fetch('https://whomovedclub.herokuapp.com/teams');
            const transfersURL      = await fetch('https://whomovedclub.herokuapp.com/transfers');

            let res1 = await teamsURL.json();
            let res2 = await transfersURL.json();
            let res3 = await dateURL.json();
            
            let leagues = [];

            res2 = await res2.sort((a,b) => new Date(b.transferDate) - new Date(a.transferDate));
            
            // eslint-disable-next-line
            await res1.map( t => {

                const s = `${t.country}/${t.league}` 
                const l = this.actions.isDuplicate(s, leagues);

                if (!l) leagues.push(s);

                teams.push(t);

            });

            // eslint-disable-next-line
            await res2.map( p => {

                transfers.push(p);
            
            });

            this.setState({
                nav: leagues,
                teams: teams,
                transfers: transfers,
                lastUpdated: res3[0].date,
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

        return (

            !this.state.loading
                ? <Home {...this.actions} {...this.state} filter={this.filters.display} />
                : <Loading messages={this.state.loadingMessages} />
                    

        )

    };

};

export default App;