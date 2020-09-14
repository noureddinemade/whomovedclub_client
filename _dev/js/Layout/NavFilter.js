import React from 'react';
import { NavLink } from 'react-router-dom';

const NavFilter = ({ transfers, teams, byLeague, generateLinks, ...t }) => {

    const link              = generateLinks(null, t);
    const tag               = t.country.substr(0,3).toLowerCase();
    const results           = byLeague(t.country, t.league);

    return (

        <li>
            <NavLink 
                exact to={ link.league }
                className={ results.length === 0 ? `disabled ${tag}` : tag }
            >

                <span className="label">{ t.league }</span>

            </NavLink>
        </li>

    )

}

export default NavFilter;