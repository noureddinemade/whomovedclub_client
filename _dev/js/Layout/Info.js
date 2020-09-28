import React from 'react';
import logo from '../../img/logo.svg';

const Info = ({ reset }) => {

    return (

        <section className="info">

            <h1 onClick={ () => reset() }>
                <img src={logo} alt="" className="logo"/>
            </h1>

        </section>

    )

};

export default Info;