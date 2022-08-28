import React from 'react';

const TeamLogos = ({ teams, current }) => {

    const teamIn        = teams.filter(a => a.name === current.in);
    const teamOut       = teams.filter(a => a.name === current.out);

    const name = {

        in:     current.in.charAt(0),
        out:    current.out.charAt(0)

    }

    return (

        <div className="teamLogos">

            {
                teamOut.length > 0 
                    ? <img src={teamOut[0].logo} alt={current.out} className="out"/>
                    : <span className="blank out">{name.out}</span>
            }

            {
                teamIn.length > 0 
                    ? <img src={teamIn[0].logo} alt={current.in}/>
                    : <span className="blank">{name.in}</span>
            }

        </div>

    )

}

export default TeamLogos;