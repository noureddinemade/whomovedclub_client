import React from 'react';
import Player from './Layout/Player';

const Transfers = ({ transfers, filtered, ...props }) => {
    
    const results = filtered ? filtered : transfers;

    return (
        
        results.length > 0
            ? results.map((t,i) => <Player {...props} key={i} t={t} /> )
            : ''
    
    )

}

export default Transfers;
