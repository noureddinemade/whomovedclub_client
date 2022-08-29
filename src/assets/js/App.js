import React, { Component } from 'react';

import Loading from './Loading';
import Home from './Home';
import Info from './Layout/Info';
import Footer from './Layout/Footer';

// This is me testing something

//

class App extends Component {

    constructor(props) {

        super(props)

        this.state = {

            nav: [],
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

        country: (c = this.state.filters[0], teams = this.state.teams) => {

            return c ? teams.filter(team => team.country === c) : teams;

        },

        league: (c = this.filters.country(), l = this.state.filters[1]) => {

            return l ? c.filter(team => team.league === l) : c;

        },

        team: (l = this.filters.league(), t = this.state.filters[3]) => {

            return t ? l.filter(team => team.name === t) : l;

        },

        display: (transfers = this.state.transfers, t = this.state.filters[3], d = this.state.filters[4]) => {

            let results = []

            if (t) {

                const filter = this.filters.team();

                // eslint-disable-next-line
                filter.map(t => {

                    if (d === 'in') {

                        // eslint-disable-next-line
                        transfers.filter(p => p.in === t.name).map(p => {

                            results.push(p);
    
                        })

                    }

                    else if (d === 'out') {

                        // eslint-disable-next-line
                        transfers.filter(p => p.out === t.name).map(p => {

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
                    transfers.filter(p => p.in === t.name).map(p => {

                        results.push(p);

                    })

                })

            }


            return results.sort((a,b) => new Date(b.date) - new Date(a.date));

        }

    }

    actions = {

        isDuplicate: (current, list) => {

            const result = list.filter(a => a === current);
        
            if (result.length > 0) {
        
                return true;
        
            }
        
        },

        generateInfo: (t, teams = this.state.teams) => {

            let result;
            let link        = { in: null, out: null };
            let cost        = t.type;
            let currency    = cost ? cost.slice(-1).toUpperCase() : null;

            const name      = t.name.includes('&apos;') ? t.name.replace('&apos;', "'") : t.name;
            const type      = t.type === 'loan' ? 'loaned' : 'transferred';

            if (t.in) {

                const ft    = teams.filter(team => team.name === t.in);
                const l     = { 
                    c: ft.length > 0 ? ft[0].country : null,
                    l: ft.length > 0 ? ft[0].league : null,
                    t: ft.length > 0 ? ft[0].name : null,
                    d: ft.length > 0 ? 'in' : null
                };

                link.in = l;

            }
            
            if (t.out) {

                const ft    = teams.filter(team => team.name === t.out);
                const l     = { 
                    c: ft.length > 0 ? ft[0].country : null,
                    l: ft.length > 0 ? ft[0].league : null, 
                    t: ft.length > 0 ? ft[0].name : null,
                    d: ft.length > 0 ? 'out' : null
                };

                link.out = l;

            }

            !t.type
                ? cost = '.'
                : t.type && t.type === 'free' ? cost = ' for free.'
                : t.type && t.type === 'loan' ? cost = '.'
                : cost = ` for €${cost.slice(0, -1)}${currency}.`

            //

            result = {

                name: name,
                cost: cost,
                type: type,
                date: t.date,
                link: link

            }

            return result;

        },

        count: (filter, transfers = this.state.transfers) => {

            let c,l,t;
            let r = 0;

            filter && filter.c ? c = this.filters.country(filter.c) : c = null;
            filter && filter.l ? l = this.filters.league(c, filter.l) : l = null;
            filter && filter.i ? t = this.filters.team(l, filter.i) : t = null;

            if (c) {

                if (l) {

                    if (t) {

                        if (filter && filter.d === 'in') {

                            transfers.filter(p => p.in === t[0].name).map(p => r = r + 1)
            
                        }
                        
                        if (filter && filter.d === 'out') {

                            transfers.filter(p => p.out === t[0].name).map(p => r = r + 1)
            
                        }

                    } else {

                        l.map(team => transfers.filter(p => p.in === team.name).map(p => r = r + 1))
    
                    }

                } else {

                    c.map(team => transfers.filter(p => p.in === team.name).map(p => r = r + 1))

                }

            } else {

                r = transfers.length;

            }

            return r;

        },

        updateFilter: (filter) => {

            this.setState({

                filters: [

                    filter && filter.c ? filter.c : null,
                    filter && filter.l ? filter.l : null,
                    filter && filter.t ? filter.t : null,
                    filter && filter.i ? filter.i : null,
                    filter && filter.d ? filter.d : null,
                    this.actions.count(filter),

                ],

                filtering:  true
    
            });

            setTimeout(() => {

                this.setState({ filtering: false })

            }, 500)
    
        }

    }

    //

    async getData () {
        let transfers   = [];
        let teams       = [];

        try {

            const dateURL           = await fetch('http://api.whomoved.club/date');
            const teamsURL          = await fetch('http://api.whomoved.club/teams');
            const transfersURL      = await fetch('http://api.whomoved.club/transfers');

            let res1 = await teamsURL.json();
            let res2 = await transfersURL.json();
            let res3 = await dateURL.json();
            
            let countries   = [];
            let leagues     = [];

            res2 = await res2.sort((a,b) => new Date(b.date) - new Date(a.date));
            
            // eslint-disable-next-line
            await res1.map( t => {

                const c = this.actions.isDuplicate(t.country, countries);
                const l = this.actions.isDuplicate(t.league, leagues);

                if (!c) countries.push(t.country);
                if (!l) leagues.push(t.league);

                teams.push(t);

            });

            await res2.map( p => transfers.push(p) );

            this.setState({
                nav: leagues,
                countries: countries,
                leagues: leagues,
                teams: teams,
                transfers: transfers,
                lastUpdated: res3[0].date,
                loading: false
            })

            //

            const filters = [null,null,null,null,'in',transfers.length]

            this.actions.updateFilter(filters)

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

            <main>

                <Info reset={this.actions.updateFilter} loading={this.state.loading} filtering={this.state.filtering} />

                {
                    
                    !this.state.loading
                        ? <Home {...this.actions} {...this.state} display={this.filters.display} />
                        : <section className="content"> <Loading /> </section>

                }

                <Footer />

            </main>
                    

        )

    };

};

export default App;