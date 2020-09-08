import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const Player = props => {

    const { t, generateLinks, teams } = props;
    const name = t.name.includes('&apos;') ? t.name.replace('&apos;', "'") : t.name;
    const link = generateLinks(t, teams);

    const linkIn = link.in ? <Link to={link.in} className="to">{t.team.in.name}</Link> : t.team.in.name;
    const linkOut = link.out ? <Link to={link.out} className="from">{t.team.out.name}</Link> : t.team.out.name;

    return (

        <div className="player">

            <p> 
                <span className="name">{ name }</span> was { t.type === 'Loan' ? 'loaned' : 'transferred' } to { linkIn } from { linkOut } <span className="date"><Moment to={ t.transferDate } /></span>{ t.type === 'Loan' || t.type === 'loan' ? '.' : <span className="cost"> for {t.type.replace(' ', '')}.</span> }
            </p>

        </div>

    )

}

export default Player;