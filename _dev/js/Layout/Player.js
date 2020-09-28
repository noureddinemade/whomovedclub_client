import React from 'react';
import Moment from 'react-moment';
import TeamLogos from './TeamLogos';

const Player = props => {

    const { t, generateInfo } = props;

    const transfer = generateInfo(t);

    return (

        <div className="player">

            <p> 

                <span className="name">{ transfer.name }</span> was { transfer.type } to { transfer.link.in } from { transfer.link.out } <span className="date"><Moment to={ transfer.date } /></span><span>{ transfer.cost }</span>

            </p>

            <TeamLogos teams={props.teams} current={t} />

        </div>

    )

}

export default Player;