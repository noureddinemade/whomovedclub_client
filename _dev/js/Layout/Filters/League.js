import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

//

const League = ({ updateFilter, count, label }) => {

    const t         = label.split('/');
    const tag       = t[0].substr(0,3).toLowerCase();
    
    const filters   = { c: t[0], l: t[1], d:'in' };
    const results   = count(filters);

    return (

        <Dropdown.Item 
            className={`${tag} ${results === 0 ? 'disabled' : ''}`} 
            onClick={ (e) => results > 0 ?  updateFilter(filters) : null }
        >
            { t[1] } ({ results })
        </Dropdown.Item>

    )

}

//

export default League;