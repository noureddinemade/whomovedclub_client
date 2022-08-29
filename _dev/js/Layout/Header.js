import React from 'react';
import logo from '../../img/logo.svg';

const Header = props => {

    const { reset, loading, filtering } = props

    return (

        <header>

            <h1 onClick={ () => reset() }>
                <img src={logo} alt="" className={`logo ${!loading && !filtering ? '' : 'loading'}`}/>
            </h1>

            <p>FILTERS</p>

        </header>

    )

};

export default Header;