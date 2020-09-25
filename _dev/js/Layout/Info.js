import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../../img/logo.svg';

const Info = () => {

    return (

        <section className="info">

            <Link to="/">
                <h1>
                    <img src={logo} alt="" className="logo"/>
                </h1>
            </Link>

        </section>

    )

};

export default Info;