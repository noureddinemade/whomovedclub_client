import React from 'react';

import blank from '../../../img/empty.png';

//

const Crest = ({ team, direction }) => {

    const t = { name: team[0], crest: {backgroundImage: `url(${team[1]})`}, blank: team[2] }
    const c = `crest ${direction}`;

    return (

        <img src={blank} style={t.crest} alt={t.name} title={t.name} className={c} />

    )

}

export default Crest;