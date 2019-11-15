//import * as d3 from 'd3';
import { min, max, timeFormat, timeHour } from 'd3';

// Simple utility functions to call the 
// same formatting on the top/bottom and left/right axes. 
const callTopBottom = (axis, scale) => {
    return axis(scale)
        .tickFormat(timeFormat("%b"));
}

const callLeftRight = (axis, scale) => {
    return axis(scale)
        // Not sure why but I couldn't get both the format and interval
        // set in .ticks(). I've separated format from interval below...
        // because it actually works...
        .tickFormat(timeFormat("%-I %p"))
        .ticks(timeHour.every(1));
}

// Find earliest sunrise.
const findEarliestSunrise = (data) => {
    const sunriseTimes = data.map(d => new Date(2011, 0, 1, d.sunrise[0], d.sunrise[1]));
    return min(sunriseTimes, d => d);
}

// Find latest sunset.
const findLatestSunset = (data) => {
    const sunsetTimes = data.map(d => new Date(2011, 0, 1, d.sunset[0], d.sunset[1]));
    return max(sunsetTimes, d => d);
}

// Format time for display.
const timeFormatter = timeFormat('%I:%M%p');


export {
    callTopBottom,
    callLeftRight,
    findEarliestSunrise,
    findLatestSunset,
    timeFormatter
};