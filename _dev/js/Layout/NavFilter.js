import React from 'react';
import { NavLink } from 'react-router-dom';

const NavFilter = ({ transfers, teams, filterTransfers, ...t }) => {

    const countryLink       = t.country.replace(/ /g, '-');
    const leagueLink        = t.league.replace(/ /g, '-');
    const link              = `/${countryLink}/${leagueLink}`;
    const tag               = t.country.substr(0,3).toLowerCase();
    const results           = filterTransfers(t);

    return (

        <li>
            <NavLink 
                exact to={ link }
                className={ results.length === 0 ? `disabled ${tag}` : tag }
            >

                <span className="label">{ t.league }</span>

            </NavLink>
        </li>

    )

}

export default NavFilter;