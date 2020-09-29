import React from 'react';
import Player from './Layout/Player';

const Transfers = ({ filter, filtering, generateInfo, updateFilter, teams }) => {

    const results = filter();

    return (

        <div className="transfers">
        
            {

                !filtering
                    ? results.length > 0
                        ? results.map((t,i) => <Player key={i} t={t} generateInfo={generateInfo} updateFilter={updateFilter} teams={teams} /> )
                        : ''
                    : <div>Loading...</div>

            }

        </div>
    
    )

}

export default Transfers;
