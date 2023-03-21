import React from 'react';

//

const TransferDate = ({ date }) => {

    const day           = 24 * 60 * 60 * 1000;
    const today         = new Date();
    const transfer      = new Date(date);
    const diff          = Math.round(Math.abs((today - transfer) / day));
    const month         = transfer.getMonth();
    
    const weeks   = parseInt(diff / 7);

    let days = diff;
    let ago = { time: '', type: '' }
    
    let daysInM;

    month === 1 ? daysInM = 28
    : month === 3 || month === 5 || month === 8 || month === 10 ? daysInM = 30
    : daysInM = 31

    const months = parseInt(diff / daysInM)

    days = days - months * daysInM;
    days = days - weeks * 7;

    months > 0 ? ago = { time: -months, type: 'month' }
    : weeks > 0 ? ago = { time: -weeks, type: 'week' }
    : ago = { time: -days, type: 'day' }

    const string = new Intl.RelativeTimeFormat().format(ago.time, ago.type);

    //

    return string

}

export default TransferDate;