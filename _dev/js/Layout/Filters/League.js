import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

//

const League = ({ updateFilter, count, country, league, tag }) => {

    const c     = country;
    const l     = league;
    // const tag   = tag;
    
    const filters   = { c: c, l: l, d:'in' };
    const results   = count(filters);

    return (

        <Dropdown.Item 
            className={`${tag} ${results === 0 ? 'disabled' : ''}`} 
            onClick={ (e) => results > 0 ?  updateFilter(filters) : null }
        >
            { l } ({ results })
        </Dropdown.Item>

    )

}

//

export default League;