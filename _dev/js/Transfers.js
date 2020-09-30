import React from 'react';

import Loading from './Loading';
import Player from './Layout/Player';

//

const Transfers = ({ display, filtering, generateInfo, updateFilter, teams }) => {

    const results = display();

    return (

        <div className="transfers">
        
            {

                !filtering
                    ? results.length > 0
                        ? results.map((t,i) => <Player key={i} t={t} generateInfo={generateInfo} updateFilter={updateFilter} teams={teams} /> )
                        : ''
                    : <Loading />

            }

        </div>
    
    )

}

//

export default Transfers;
