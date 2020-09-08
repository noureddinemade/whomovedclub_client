import React from 'react';
import Moment from 'react-moment';

const Info = ({ lastUpdated }) => {

    return (

        <section className="info">

            <h1>
                <span>Who</span><span>moved</span>.club
            </h1>

            { lastUpdated !== null ? <p className="small">Last updated <Moment to={ lastUpdated } /></p> : '' }

        </section>

    )

};

export default Info;