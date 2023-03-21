import React from 'react';

//

const Type = ({ type }) => {

    let string;

    type === 'loan' ? string = 'on loan' 
    : type === 'free' ? string = 'for free'
    : string = `for €${type}`

    return (

        <span className="bold">
            {string}
        </span>

    )

}

export default Type;