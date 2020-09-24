import React from 'react';

const Loading = ({ messages }) => {

    const waiting = messages.map((m, i) => <p key={i}>{m}</p>); 

    return (

        <main>

            <div className="loading">

                <p>Loading</p>

                { waiting }

            </div>

        </main>

    )

}

export default Loading;