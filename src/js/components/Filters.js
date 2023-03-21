import React from 'react';

//

const Filters = props => {

    const { data, transferChange } = props;

    let countries         = data.countries;
    let leagues           = data.leagues;
    let teams             = data.teams;

    const handleTransferFilters = (event) => {

        transferChange(event.target.name, event.target.value);

    };

    countries = countries.map((c,i) => {

        return (

            <option key={i} value={c}>{c}</option>  

        )

    });

    leagues = leagues.map((l,i) => {

        return (

            <option key={i} value={l}>{l}</option>  

        )

    });

    teams = teams.map((t,i) => {

        return (

            <option key={i} value={t.name}>{t.name}</option>

        )

    });

    return (

        <section className="filters">

            Filters

            <select name="country">

                <option value="">All</option>
                { countries }

            </select>

            <select name="league">

                <option value="">All</option>
                { leagues }

            </select>

            <select name="in" onChange={handleTransferFilters}>

                <option value="">All</option>
                { teams }

            </select>

            <select name="type" onChange={handleTransferFilters}>

                <option value="">All</option>
                <option value="free">Free</option>
                <option value="loan">Loan</option>

            </select>

        </section>

    )

}

export default Filters;