import React from 'react';

import TransferDate     from './Player/Date';
import Name             from './Player/Name';
import Team             from './Player/Team';
import Type             from './Player/Type';
import Crest           from './Player/Crest';

//

const Player = props => {

    const { date, name, type, teamIn, teamOut, onFilterChange } = props;

    return (

        <div className='Player'>

            <Crest team={teamOut} direction='out' />
            <Crest team={teamIn} direction='in' />

            <p>
                <Name name={name} /> moved from <Team teamIn={teamIn[0]} teamOut={teamOut[0]} onFilterChange={onFilterChange} /> <Type type={type} /> <TransferDate date={date} />.
            </p>

        </div>

    )

}

export default Player;
