import React, { Component } from 'react';

import Loading from './Loading';
import Home from './Home';
import Info from './Layout/Info';
import Footer from './Layout/Footer';

//

class App extends Component {

    constructor(props) {

        super(props)

        this.state = {

            nav: [],
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

            return t ? l.filter(team => team.teamID === t) : l;

        },

        display: (transfers = this.state.transfers, t = this.state.filters[3], d = this.state.filters[4]) => {

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

        generateInfo: (t, teams = this.state.teams) => {

            let result;
            let link = { in: null, out: null };
            let cost = t.type.replace(' ', '');

            const name      = t.name.includes('&apos;') ? t.name.replace('&apos;', "'") : t.name;
            const type      = t.type === 'Loan' ? 'loaned' : 'transferred';

            if (t.team.in.id) {

                const ft    = teams.filter(team => team.teamID === t.team.in.id);
                const l     = { 
                    c: ft.length > 0 ? ft[0].country : null,
                    l: ft.length > 0 ? ft[0].league : null,
                    t: ft.length > 0 ? ft[0].name : null,
                    i: ft.length > 0 ? ft[0].teamID : null, 
                    d: ft.length > 0 ? 'in' : null
                };

                link.in = l;

            }
            
            if (t.team.out.id) {

                const ft    = teams.filter(team => team.teamID === t.team.out.id);
                const l     = { 
                    c: ft.length > 0 ? ft[0].country : null,
                    l: ft.length > 0 ? ft[0].league : null, 
                    t: ft.length > 0 ? ft[0].name : null,
                    i: ft.length > 0 ? ft[0].teamID : null, 
                    d: ft.length > 0 ? 'out' : null
                };

                link.out = l;

            }

            t.type === 'Free' 
                ? cost = ' for free.'
                : t.type === 'Loan' ? cost = '.'
                : t.type.charAt(0) !== '€' ? cost = ` for €${cost}.`
                : cost = ` for ${cost}.`

            //

            result = {

                name: name,
                cost: cost,
                type: type,
                date: t.transferDate,
                link: link

            }

            return result;

        },

        count: (filter, transfers = this.state.transfers) => {

            let c,l,t,r;

            filter && filter.c ? c = this.filters.country(filter.c) : c = null;
            filter && filter.l ? l = this.filters.league(c, filter.l) : l = null;
            filter && filter.t ? t = this.filters.team(l, filter.t) : t = null;

            return false;

            if (c) {

                if (l) {

                    if (t) {

                        if (filter && filter.d === 'in') {

                            transfers.filter(p => p.team.in.id === t[0].teamID).map(p => r = r + 1)
            
                        } else if (filter && filter.d === 'out') {
            
                            transfers.filter(p => p.team.out.id === t[0].teamID).map(p => r = r + 1)
            
                        } else {
            
                            return r = null;
            
                        }

                    }

                }

            }

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
                filters: [null, null, null, null, transfers.length],
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

            <main>

                <Info reset={this.actions.updateFilter} />

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