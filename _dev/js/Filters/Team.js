import React from 'react';
import { useParams } from 'react-router-dom';
import Transfers from '../Transfers';
import Counter from '../Layout/Counter';

//

const TeamTransfers = ({ filterByTeam, ...props }) => {

    let { country, league, team, direction } = useParams();

    const filtered = filterByTeam(country, league, team, direction);

    return filtered.length > 0 
        ? <div> <Counter length={filtered.length} team={team} direction={direction} {...props} /> <Transfers filtered={filtered} {...props} /> </div>
        : <div className="noResults"><p>No transfers in the last 60 days.</p></div>

}

//

export default TeamTransfers;