import React from 'react';
import { useParams } from 'react-router-dom';
import Transfers from '../Transfers';
import Counter from '../Layout/Counter';

//

const LeagueTransfers = ({ filterByLeague, ...props }) => {

    let { country, league } = useParams();

    const filtered = filterByLeague(country, league);

    return filtered.length > 0 
        ? <div> <Counter length={filtered.length} /> <Transfers filtered={filtered} {...props} /> </div>
        : <div className="noResults"><p>No transfers in the last 60 days.</p></div>

}

//

export default LeagueTransfers;