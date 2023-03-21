import React from 'react';

//

const Team = props => {

    const { teamIn, teamOut, onFilterChange } = props

    const handleFilterChange = (property, value) => {

        onFilterChange(property, value);

    };

    return (

        <span className="teams">

            <span className="out" onClick={() => {handleFilterChange('out', teamOut)}}>{teamOut}</span> to <span className="in" onClick={() => {handleFilterChange('in', teamIn)}}>{teamIn}</span>

        </span>
        
    )

}

export default Team;