import React from 'react';

//

const construct = (length, team, direction) => {

    if (team || direction) {

        const a = length > 1 ? `${length} players have` : `${length} player has`;
        const b = direction === 'in' ? `moved to ${team}` : `left ${team}`;

        return `${a} ${b}`;

    } else {

        return length > 1 ? `${length} transfers` : `${length} transfer`;

    }

}

//

const Counter = ({ length, team, direction, removeDashes }) => {

    const t = team ? removeDashes(team) : null;

    return (

        <p className={`status ${direction === 'out' ? 'out' : 'in'}`}>
            
            { construct(length, t, direction) } in the last 60 days.
            
        </p>

    )

}

//

export default Counter;