import React from 'react';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';
import NavFilter from './NavFilter';

const Navigation = props => {

    const { teams, isDuplicate, transfers, lastUpdated } = props;

    let leagues = [];

    // eslint-disable-next-line
    const links = teams.map((t,i) => { 

        const condition = isDuplicate(t.league, leagues);

        if (!condition) {

            leagues.push(t.league);

            return <NavFilter {...t} {...props} key={i} />;

        }

    });

    return (

        <nav>

            { lastUpdated !== null ? <p className="small">Last updated <Moment to={ lastUpdated } /></p> : '' }

            <ul>

                <li>
                    <NavLink 
                        exact to="/"
                        className={`all ${transfers.length === 0 ? 'disabled' : '' }`}
                    >

                        <span className="label">All</span>
                        
                    </NavLink>
                </li>

                { links }

            </ul>

        </nav>

    )

}

export default Navigation;