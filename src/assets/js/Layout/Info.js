import React from 'react';
import logo from '../../img/logo.svg';

const Info = ({ reset, loading, filtering }) => {

    return (

        <section className="info">

            <h1 onClick={ () => reset() }>
                <img src={logo} alt="" className={`logo ${!loading && !filtering ? '' : 'loading'}`}/>
            </h1>

        </section>

    )

};

export default Info;