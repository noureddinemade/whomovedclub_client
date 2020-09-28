import React from 'react';
import Player from './Layout/Player';

const Transfers = props => {

    const { filter } = props;

    const results = filter();

    return (

        <div className="transfers">
        
            { 
                results.length > 0
                    ? results.map((t,i) => <Player {...props} key={i} t={t} /> )
                    : ''
            }

        </div>
    
    )

}

export default Transfers;
