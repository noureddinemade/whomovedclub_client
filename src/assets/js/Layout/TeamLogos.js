import React from 'react';

const TeamLogos = ({ teams, current }) => {

    const teamIn        = teams.filter(a => a.teamID === current.team.in.id);
    const teamOut       = teams.filter(a => a.teamID === current.team.out.id);

    const image = { 

        in: teamIn.length > 0 ? teamIn[0].logo : require('../../img/nocrest.png'), 
        out: teamOut.length > 0 ? teamOut[0].logo : require('../../img/nocrest.png') 

    };

    return (

        <div className="teamLogos">

            <img src={image.out} alt={current.team.out.name} />
            <img src={image.in} alt={current.team.in.name}/>

        </div>

    )

}

export default TeamLogos;