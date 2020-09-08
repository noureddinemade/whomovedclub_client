import React, { Component } from 'react';
import Home from './Home';
import Loading from './Loading';

class App extends Component {

    constructor(props) {

        super(props)

        this.state = {

            teams: [],
            transfers: [],
            lastUpdated: '',
            loading: true,
            loadingMessages: []

        };
        
    };

    //

    setup = {

        daysBetween: (d1, d2) => {

            const result = Math.abs(d1.getTime() - d2.getTime());
            
            return Math.floor(result / (1000 * 60 * 60 * 24));

        },

        dateCondition: (transferDate) => {

            const d1    = new Date();
            const d2    = new Date(transferDate);
            const date  = this.setup.daysBetween(d1, d2);

            if (date >= 60) {

                return true;

            }

            else if (date < 0) {

                return true;

            }

            else {

                return false;

            }

        },

        tooLong: () => {

            if (this.state.loading === true) {

                const messages  =  [
    
                    'Almost there...',
                    'Not long now...',
                    'Just one more thing...'
    
                ];

                let count       = -1;
    
                setInterval(() => {
    
                    count === messages.length - 1 ? count = 0 : count = count + 1;
    
                    //
    
                    this.setState((prevState) => ({
    
                        loadingMessages: [...prevState.loadingMessages, messages[count]]
    
                    }))
            
                }, 3723)
    
            }

        },

        duplicatePlayer: (current, list) => {

            const nameCondition     = list.filter(a => a.name === current.name);
            const typeCondition     = list.filter(a => a.type === current.type);
            const teamInCondition   = list.filter(a => a.team.in.id === current.team.in.id);
            const teamOutCondition  = list.filter(a => a.team.out.id === current.team.out.id);

            if (nameCondition.length > 0) {

                if (typeCondition.length > 0) {

                    return true;

                } else if (teamInCondition.length > 0 || teamOutCondition.length > 0) {

                    return true;

                } else {

                    return false;

                }

            }

            else {

                return false;

            }

        }

    }

    actions = {

        isDuplicate: (current, list) => {

            const result = list.filter(a => a === current);
        
            if (result.length > 0) {
        
                return true;
        
            }
        
        },

        removeDashes: (string) => {

            return string.replace(/-/g, ' ');

        },

        filterStart: (country, league, teams = this.state.teams) => {

            const c             = this.actions.removeDashes(country);
            const l             = this.actions.removeDashes(league);
            const countryFilter = teams.filter(team => team.country === c);
            const leagueFilter  = countryFilter.filter(team => team.league === l);

            return leagueFilter;

        },

        filterByTeam: (country, league, current, direction, transfers = this.state.transfers) => {

            let results = [];

            const t             = this.actions.removeDashes(current);
            const filter        = this.actions.filterStart(country, league);
            const teamFilter    = filter.filter(team => team.name === t);

            // eslint-disable-next-line
            transfers.map(p => {

                if (direction === 'in') {

                    if (p.team.in.id === teamFilter[0].teamID) {

                        results.push(p);

                    }

                }

                else if (direction === 'out') {

                    if (p.team.out.id === teamFilter[0].teamID) {

                        results.push(p);

                    }

                }

                else {

                    results = null;

                }

            });

            return results.sort((a,b) => new Date(b.transferDate) - new Date(a.transferDate));

        },

        filterByLeague: (country, league, transfers = this.state.transfers) => {

            let results = [];

            const filter = this.actions.filterStart(country, league);

            // eslint-disable-next-line
            filter.map(t => {

                const res = transfers.filter(transfer => transfer.team.in.id === t.teamID);
        
                if (res.length > 0) { res.map(t => results.push(t)) };

            });

            return results.sort((a,b) => new Date(b.transferDate) - new Date(a.transferDate));

        },

        filterTransfers: (current, teams = this.state.teams, transfers = this.state.transfers) => {

            let results = [];

            const filter = this.actions.filterStart(current.country, current.league);

            // eslint-disable-next-line
            filter.map(t => {

                const res = transfers.filter(transfer => transfer.team.in.id === t.teamID);
        
                if (res.length > 0) { res.map(t => results.push(t)) }; 
        
            });

            return results.sort((a,b) => new Date(b.transferDate) - new Date(a.transferDate));

        },

        generateLinks: (current, teams = this.state.teams) => {

            const teamInFilter    = teams.filter(team => team.teamID === current.team.in.id);
            const teamOutFilter   = teams.filter(team => team.teamID === current.team.out.id);

            let result;
            let teamIn;
            let teamInLink;
            let teamOut;
            let teamOutLink;

            if (teamInFilter !== 'undefined' && teamInFilter.length > 0) {

                teamIn = {

                    name:       teamInFilter[0].name.replace(/ /g, '-'),
                    country:    teamInFilter[0].country.replace(/ /g, '-'),
                    league:     teamInFilter[0].league.replace(/ /g, '-')

                }

                teamInLink = `/${teamIn.country}/${teamIn.league}/${teamIn.name}/in`

            } else {

                teamIn      = null;
                teamInLink  = null;

            } 

            if (teamOutFilter !== 'undefined' && teamOutFilter.length > 0) {

                teamOut = {

                    name:       teamOutFilter[0].name.replace(/ /g, '-'),
                    country:    teamOutFilter[0].country.replace(/ /g, '-'),
                    league:     teamOutFilter[0].league.replace(/ /g, '-')

                }

                teamOutLink = `/${teamOut.country}/${teamOut.league}/${teamOut.name}/out`

            } else {

                teamOut      = null;
                teamOutLink  = null;

            }

            //

            result = {

                in:     teamInLink,
                out:    teamOutLink

            };

            return result;

        }

    }

    //

    async getData () {

        let transfers   = [];
        let teams       = [];

        try {

            const teamsURL          = await fetch('http://localhost:5000/api/teams');
            const transfersURL      = await fetch('http://localhost:5000/api/transfers');

            let res1 = await teamsURL.json();
            let res2 = await transfersURL.json();

            res2 = await res2.sort((a,b) => new Date(b.transferDate) - new Date(a.transferDate));
            
            // eslint-disable-next-line
            await res1.map( t => teams.push(t) );
            // eslint-disable-next-line
            await res2.map( p => {

                const dateCondition         = this.setup.dateCondition(p.transferDate);
                const duplicateCondition    = this.setup.duplicatePlayer(p, transfers);
                
                if (!dateCondition && !duplicateCondition) { transfers.push(p); };
            
            });

            const lastUpdated = transfers.length > 0 ? transfers[0].lastUpdated : null; 

            this.setState({
                teams: teams,
                transfers: transfers,
                lastUpdated: lastUpdated,
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

                {

                    !this.state.loading
                        ? <Home {...this.state} {...this.actions} />
                        : <Loading messages={this.state.loadingMessages} />
                        
                }

            </main>

        )

    };

};

export default App;