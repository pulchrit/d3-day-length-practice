import React, { useRef, useEffect } from 'react';
import { data } from './data';
import * as d3 from 'd3';

const Chart = ({ width, height }) => {

    const svg = useRef();

    const padding = 40;

    // Use useEffect hook to load viz on component mount.
    useEffect( () => {
        
        // xScale runs from 1/1/2011 to 12/31/2011, i.e., the extent of the data
        const xScale = d3.scaleTime()
            .domain([new Date(2011, 0, 1), new Date(2011, 11, 31)]).nice()
            .range([5, width - (2 * padding)]);

        // yScale runs from runs from 00:00 - 23:59
        const yScale = d3.scaleTime()
            .domain([new Date(2011, 0, 1, 23, 59), new Date(2011, 0, 1)]).nice()
            .range([height - (2 * padding), 5]);

        // Select the svg element using the ref.
        const dayLength = d3.select(svg.current);

        // Simple utility functions to call the 
        // same formatting on the top/bottom and left/right axes. 
        // Move these into utility function file...
        const callTopBottom = (axis) => {
            return axis(xScale)
                .tickFormat(d3.timeFormat("%b"));
        }

        const callLeftRight = (axis) => {
            return axis(yScale)
                // Not sure why but I couldn't get both the format and interval
                // set in .ticks(). I've separated format from interval below...
                // because it actually works...
                .tickFormat(d3.timeFormat("%-I %p"))
                .ticks(d3.timeHour.every(1));
        }

        // Create and append each axis.
        // Bottom axis
        dayLength.append('g')
            .attr('transform', `translate(${padding}, ${height - padding + 3})`)
            .call(callTopBottom(d3.axisBottom));
         
        // Top axis
        dayLength.append('g')
            .attr('transform', `translate(${padding}, ${padding})`)
            .call(callTopBottom(d3.axisTop));
        
        // Left axis
        dayLength.append('g')
            .attr('transform', `translate(${padding}, ${padding})`)
            .call(callLeftRight(d3.axisLeft));
    
        // Right axis
        dayLength.append('g')
            .attr('transform', `translate(${width - padding + 2}, ${padding})`)
            .call(callLeftRight(d3.axisRight));

        // Create a group for sunrise and sunset paths.
        const lineGroup = dayLength.append('g')
            .attr('transform', `translate(${padding}, ${padding})`);


        // Draw the background. The part of the background that remains uncovered
        // will represent the daylight hours.
        lineGroup.append('rect')
            .attr('x', 5)
            .attr('y', 5)
            .attr('height', height - (2 * padding + 5))
            .attr('width', width - (2 * padding + 5))
            .attr('fill', 'lightyellow');
        
        // Render the visualization. sunriseLine and sunsetLine are
        // path/area elements that use the date for the
        // x coordinate and sunrise and sunset (repectively) for the y 
        // coordinate. The sunrise shape is anchored at the top of the chart
        // and the sunset area is anchored at the bottom of the chart. 
        // sunriseLine and sunsetLine are actually helper area functions fed to 
        // the path element.
        const sunriseLine = d3.area()
            .curve(d3.curveLinear) // this is the default
            .x(d => xScale(d.date))
            .y1(yScale(new Date(2011, 0, 1)))
            .y0(d => yScale(new Date(2011, 0, 1, d.sunrise[0], d.sunrise[1])));
            

        const sunsetLine = d3.area()
            .curve(d3.curveLinear) // this is the default
            .x(d => xScale(d.date))
            .y1(d => yScale(new Date(2011, 0, 1, d.sunset[0], d.sunset[1])))
            .y0(yScale(new Date(2011, 0, 1, 23, 59)));

        // Append paths to the lineGroup and use the area() functions to describe 
        // how the paths will be drawn.
        lineGroup.append('path')
            .datum(data) // datum does not compute a join only data() does, so this is a static viz
            .attr('d', sunriseLine) // d defines the path to be drawn, i.e. sunriseLine 
            .attr('fill', 'steelblue')
            .attr('class', 'sunrise');
            
        
        lineGroup.append('path')
            .datum(data) // datum does not compute a join only data() does, so this is a static viz
            .attr('d', sunsetLine) // d defines the path to be drawn, i.e. sunsetLine 
            .attr('fill', 'steelblue')
            .attr('class', 'sunset');
             
        
        // Draw a line representing 12 noon across the entire visualization.
        lineGroup.append('line')
            .attr('x1', xScale(new Date(2011, 0, 1)))
            .attr('x2', xScale(new Date(2011, 11, 31)))
            .attr('y1', yScale(new Date(2011, 0, 1, 12)))
            .attr('y2', yScale(new Date(2011, 0, 1, 12)))
            .attr('stroke', 'lightgray');
    }, [height, width]);

    return (
        <svg 
            width={width} 
            height={height} 
            ref={svg}
        >
        </svg>
    )

}

export default Chart; 