import React, { useState } from 'react';

import Filters from './Filters';
import Display from './Display';

//

const Transfers = props => {

    const { state }     = props;

    const countries     = state.countries;
    const leagues       = state.leagues;
    const teams         = state.teams;
    const transfers     = state.transfers;

    const [data, setData] = useState([ ...transfers ]);

    const [ countryFilter, setCountry ]     = useState({});
    const [ leagueFilter, setLeague ]       = useState({});
    const [ transferFilters, setTransfers ] = useState ({

        in:         [],
        out:        [],
        type:       []

    });

    //

    const handleCountryChange = (value) => {

        setCountry({ value });

    };

    const handleLeagueChange = (value) => {

        setLeague({ value });

    };

    const handleTransferFilters = (name, value) => {

        setTransfers({
            ...transferFilters,
            [name]: [value],
        });

    };

    //

    const applyFilters = (data) => {

        const filteredCountries     = teams.filter( a => a.country === countryFilter);
        const filteredLeagues       = teams.filter( a => a.league === leagueFilter);

        let filteredData;

        if (filteredCountries.length > 0) {
            
        }

        filteredData = data.filter((item) => {

            return (

                item.in.includes(transferFilters.in) &&
                item.out.includes(transferFilters.out) &&
                item.type.includes(transferFilters.type)

            );

        });

        return transferFilters.in === '' && transferFilters.out === '' && transferFilters.type === ''
            ? data
            : filteredData;

    };

    //

    const filtersArray = Object.values(transferFilters);

    const displayFilters = filtersArray.map((filterGroup,i) => {

        return (

            filterGroup.map((f, key) => {

                let type;

                  i === 0 ? type = 'in'
                : i === 1 ? type = 'out'
                : type = 'type'

                //

                if (f !== '') {

                    return (

                        <button key={key} onClick={() => { handleTransferFilters(type,'') }}>{f}</button>

                    )

                }

            })

        )

    })

    //
    
    return (

        <span>

            <Filters data={state} transferChange={handleTransferFilters} countryChange={handleCountryChange} leagueChange={handleLeagueChange} />

            { displayFilters }

            <Display teams={teams} data={applyFilters(data)} transferChange={handleTransferFilters} />

        </span>

    )

}

export default Transfers;