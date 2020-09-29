import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const NavFilter = ({ updateFilter, label }) => {

    const t         = label.split('/');
    const tag       = t[0].substr(0,3).toLowerCase();
    
    const filters   = { c: t[0], l: t[1] };
    const results   = 1;

    return (

        <Dropdown.Item 
            className={`${tag} ${results === 0 ? 'disabled' : ''}`} 
            onClick={ (e) => results > 0 ?  updateFilter(filters) : null }
        >
            { t[1] } ({ results })
        </Dropdown.Item>

    )

}

export default NavFilter;