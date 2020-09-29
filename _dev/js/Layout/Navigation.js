import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Moment from 'react-moment';

import NavFilter from './NavFilter';

//

const Navigation = props => {

    const { nav, lastUpdated, filters, updateFilter } = props;

    let c = filters[0];
    let l = filters[1];
    let t = filters[2];
    let d = filters[4];
    let r = filters[5];

    let tag     = c ? c.substr(0,3).toLowerCase() : 'all';
    let count   = r;

    const links = nav.map((t,i) => <NavFilter label={t} key={i} updateFilter={updateFilter} /> );

    return (

        <nav>

            { lastUpdated !== null ? <p className="small">Last updated <Moment to={ lastUpdated } /></p> : '' }

            <Dropdown>

                <Dropdown.Toggle id="dropdown-basic" className={tag}>
                    { l ? l : 'All' }{ t ? ` / ${t}`  : '' }
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