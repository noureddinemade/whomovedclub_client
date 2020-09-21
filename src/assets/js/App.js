import React, { Component } from 'react';
import { Link } from 'react-router-dom'
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

    actions = {

        isDuplicate: (current, list) => {

            const result = list.filter(a => a === current);
        
            if (result.length > 0) {
        
                return true;
        
            }
        
        },

        addDashes: (string) => {

            return string.replace(/ /g, '-');

        },

        removeDashes: (string) => {

            return string.replace(/-/g, ' ');

        },

        generateLinks: (current = null, nav = null, teams = this.state.teams) => {

            let result;
            let teamIn;
            let teamOut;
            let leagueIn;
            let teamInLink;
            let teamOutLink;
            let leagueInLink;

            if (current) {

                const teamInFilter    = teams.filter(team => team.teamID === current.team.in.id);
                const teamOutFilter   = teams.filter(team => team.teamID === current.team.out.id);
    
                if (teamInFilter !== 'undefined' && teamInFilter.length > 0) {
    
                    teamIn = {
    
                        name:       this.actions.addDashes(teamInFilter[0].name),
                        country:    this.actions.addDashes(teamInFilter[0].country),
                        league:     this.actions.addDashes(teamInFilter[0].league)
    
                    }
    
                    teamInLink = <Link to={`/${teamIn.country}/${teamIn.league}/${teamIn.name}/in`} className="to">{current.team.in.name}</Link>;
    
                } else {

                    teamInLink  = current.team.in.name;
    
                } 
    
                if (teamOutFilter !== 'undefined' && teamOutFilter.length > 0) {
    
                    teamOut = {
    
                        name:       this.actions.addDashes(teamOutFilter[0].name),
                        country:    this.actions.addDashes(teamOutFilter[0].country),
                        league:     this.actions.addDashes(teamOutFilter[0].league)
    
                    }
    
                    teamOutLink = <Link to={`/${teamOut.country}/${teamOut.league}/${teamOut.name}/out`} className="from">{current.team.out.name}</Link>;
    
                } else {
    
                    teamOutLink  = current.team.out.name;
    
                }

            }
            else if (nav) {

                leagueIn = {

                    country: this.actions.addDashes(nav.country),
                    league: this.actions.addDashes(nav.league),

                }

                leagueInLink = `/${leagueIn.country}/${leagueIn.league}`;

            }

            //

            result = {

                in:     teamInLink,
                out:    teamOutLink,
                league: leagueInLink

            };

            return result;

        },

        generateInfo: (t) => {

            let result;
            let cost = t.type.replace(' ', '');

            const name = t.name.includes('&apos;') ? t.name.replace('&apos;', "'") : t.name;
            const type = t.type === 'Loan' ? 'loaned' : 'transferred';

            if (t.type === 'Free') {

                cost = ' for free.'

            }

            else if (t.type === 'Loan') {

                cost = '.'

            }

            else if (t.type.charAt(0) !== '€') {

                cost = ` for €${cost}.`;

            }

            else {

                cost = ` for ${cost}.`

            }
            

            result = {

                name: name,
                cost: cost,
                type: type,
                date: t.transferDate,
                link: this.actions.generateLinks(t)

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

        }

    }

    filters = {

        start: (country, league, teams = this.state.teams) => {

            const c             = this.actions.removeDashes(country);
            const l             = this.actions.removeDashes(league);
            const countryFilter = teams.filter(team => team.country === c);
            const leagueFilter  = countryFilter.filter(team => team.league === l);

            return leagueFilter;

        },

        byTeam: (country, league, current, direction, transfers = this.state.transfers) => {

            let results = [];

            const t             = this.actions.removeDashes(current);
            const filter        = this.filters.start(country, league);
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

        byLeague: (country, league, transfers = this.state.transfers) => {

            let results = [];

            const filter = this.filters.start(country, league);

            // eslint-disable-next-line
            filter.map(t => {

                const res = transfers.filter(transfer => transfer.team.in.id === t.teamID);
        
                if (res.length > 0) { res.map(t => results.push(t)) };

            });

            return results.sort((a,b) => new Date(b.transferDate) - new Date(a.transferDate));

        }

    }

    //

    async getData () {

        let transfers   = [];
        let teams       = [];

        try {

            const teamsURL          = await fetch('https://whomovedclub.herokuapp.com/teams');
            const transfersURL      = await fetch('https://whomovedclub.herokuapp.com/transfers');

            let res1 = await teamsURL.json();
            let res2 = await transfersURL.json();

            res2 = await res2.sort((a,b) => new Date(b.transferDate) - new Date(a.transferDate));
            
            // eslint-disable-next-line
            await res1.map( t => teams.push(t) );
            // eslint-disable-next-line
            await res2.map( p => {

                transfers.push(p);
            
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

        let count = 0;

        this.getData();

        setTimeout(() => { this.actions.imWaiting(count); count = count + 1; }, 3000)
        setTimeout(() => { this.actions.imWaiting(count); count = count + 1; }, 6000)
        setTimeout(() => { this.actions.imWaiting(count); count = 0; }, 9000)

    }

    //

    render() {

        return (

            <main>

                {

                    !this.state.loading
                        ? <Home {...this.state} {...this.actions} {...this.filters} />
                        : <Loading messages={this.state.loadingMessages} />
                        
                }

            </main>

        )

    };

};

export default App;