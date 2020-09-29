import React from 'react';
import Moment from 'react-moment';
import TeamLogos from './TeamLogos';

const Player = ({ t, generateInfo, updateFilter, teams }) => {

    const transfer  = generateInfo(t);
    const teamIn    = transfer.link.in.t ? <button onClick={() => updateFilter(transfer.link.in) } className="in">{ t.team.in.name }</button> : t.team.in.name;
    const teamOut   = transfer.link.out.t ? <button onClick={() => updateFilter(transfer.link.out) } className="out">{ t.team.out.name }</button> : t.team.out.name;

    return (

        <div className="player">

            <p> 

                <span className="name">{ transfer.name }</span> was { transfer.type } to { teamIn } from { teamOut } <span className="date"><Moment to={ transfer.date } /></span><span>{ transfer.cost }</span>

            </p>

            <TeamLogos teams={teams} current={t} />

        </div>

    )

}

export default Player;