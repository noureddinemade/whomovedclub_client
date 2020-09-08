import React from 'react';

const Loading = ({ messages }) => {

    return (

        <div className="loading">

            <p>Loading...</p>

            { messages.map(m => <p>{m}</p>) }

        </div>

    )

}

export default Loading;