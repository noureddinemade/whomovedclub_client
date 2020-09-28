import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Moment from 'react-moment';

import NavFilter from './NavFilter';

//

const Navigation = props => {

    const { nav, lastUpdated, country, league, updateFilter, count } = props;
    const results = { c: country, l: league};

    let tag = country ? country.substr(0,3).toLowerCase() : 'all';

    const links = nav.map((t,i) => <NavFilter label={t} key={i} updateFilter={updateFilter} count={count} /> );

    return (

        <nav>

            { lastUpdated !== null ? <p className="small">Last updated <Moment to={ lastUpdated } /></p> : '' }

            <Dropdown>

                <Dropdown.Toggle id="dropdown-basic" className={tag}>
                    { league ? `${league} (${count(results)})` : 'All' }
                </Dropdown.Toggle>

                <Dropdown.Menu>

                    <Dropdown.Item className="all" onClick={() => updateFilter()}>All</Dropdown.Item>

                    { links }

                </Dropdown.Menu>

            </Dropdown>

        </nav>

    )

}

//

export default Navigation;