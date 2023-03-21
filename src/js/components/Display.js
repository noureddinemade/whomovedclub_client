import React from 'react';

import Player from './Player';
import noCrest from '../../img/no-crest.svg';

//

const teamExists = (teams, current) => {

    const result = teams.filter(a => a.name === current);

    return result.length > 0 ? [result[0].name, result[0].logo] : [current, noCrest];

}

//

const Transfers = props => {

    const { data, teams, transferChange } = props;

    const results = data.map((t,i) => {

        const teamIn    = teamExists(teams, t.in);
        const teamOut   = teamExists(teams, t.out);

        return (

            <Player 
                key={i} 
                date={t.date} 
                name={t.name} 
                teamIn={teamIn}
                teamOut={teamOut}
                type={t.type}
                onFilterChange={transferChange}
            />

        )

    })

    //
    
    return (

        <section className="transfers">

            { results }

        </section>

    )

}

export default Transfers;