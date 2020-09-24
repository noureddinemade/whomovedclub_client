import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { LinkContainer } from 'react-router-bootstrap';

const NavFilter = ({ transfers, teams, byLeague, generateLinks, updateFilter, ...t }) => {

    const link              = generateLinks(null, t);
    const tag               = t.country.substr(0,3).toLowerCase();
    const results           = byLeague(t.country, t.league);

    return (

        <LinkContainer 
            to={link.league}
            className={`dropdown-item ${tag} ${results.length === 0 ? 'disabled' : ''}`}
        >

            <Dropdown.Item>
                { t.league } ({results.length})
            </Dropdown.Item>

        </LinkContainer>

    )

}

export default NavFilter;