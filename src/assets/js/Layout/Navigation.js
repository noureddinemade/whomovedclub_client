import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { LinkContainer } from 'react-router-bootstrap';
import Moment from 'react-moment';
import NavFilter from './NavFilter';

const Navigation = props => {

    const { teams, isDuplicate, transfers, lastUpdated, filterLeague, filterTeam, filterDirection  } = props;

    let leagues     = [];

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

            <Dropdown>

                <Dropdown.Toggle id="dropdown-basic">
                    { filterLeague } 
                    <span className="disabled">{ filterTeam ? ` / ${filterTeam}` : '' }
                    { filterDirection ? ` / ${filterDirection}` : '' }</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>

                    <LinkContainer 
                        to="/"
                        className={`dropdown-item all ${transfers.length === 0 ? 'disabled' : ''}`}
                    >

                        <Dropdown.Item>All</Dropdown.Item>
                        
                    </LinkContainer>

                    { links }

                </Dropdown.Menu>

            </Dropdown>

        </nav>

    )

}

export default Navigation;