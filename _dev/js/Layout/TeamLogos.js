import React from 'react';

const TeamLogos = ({ teams, current }) => {

    const teamIn        = teams.filter(a => a.teamID === current.team.in.id);
    const teamOut       = teams.filter(a => a.teamID === current.team.out.id);

    const name = {

        in:     current.team.in.name.charAt(0),
        out:    current.team.out.name.charAt(0)

    }

    return (

        <div className="teamLogos">

            {
                teamOut.length > 0 
                    ? <img src={teamOut[0].logo} alt={current.team.out.name} className="out"/>
                    : <span className="blank out">{name.out}</span>
            }

            {
                teamIn.length > 0 
                    ? <img src={teamIn[0].logo} alt={current.team.in.name}/>
                    : <span className="blank">{name.in}</span>
            }

        </div>

    )

}

export default TeamLogos;