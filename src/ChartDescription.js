import React from 'react';
import './ChartDescription.css';

const ChartDescription = () => {
    return (
        <ul className="description">
            <li>The yellow area shows daylight hours; the blue, nighttime hours.</li>
            <li>The earliest sunrise is noted by a horizontal line and time.</li>
            <li>The latest sunset is noted by a horizontal line and time.</li>
        </ul>
    )
}

export default ChartDescription;