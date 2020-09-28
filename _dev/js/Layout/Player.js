import React from 'react';
import Moment from 'react-moment';
import TeamLogos from './TeamLogos';

const Player = props => {

    const { t, generateInfo, updateFilter } = props;

    const transfer  = generateInfo(t);
    const filter    = { in: { t: t.team.in.id, d: 'in' }, out: { t: t.team.out.id, d: 'out' }  };

    return (

        <div className="player">

            <p> 

                <span className="name">{ transfer.name }</span> was { transfer.type } to <button onClick={() => updateFilter(filter.in) }>{ t.team.in.name }</button> from <button onClick={() => updateFilter(filter.out) }>{ t.team.out.name }</button> <span className="date"><Moment to={ transfer.date } /></span><span>{ transfer.cost }</span>

            </p>

            <TeamLogos teams={props.teams} current={t} />

        </div>

    )

}

export default Player;