import React, { useRef, useEffect } from 'react';
import { data } from './data';
import * as d3 from 'd3';

const Chart = ({ width, height }) => {

    const svg = useRef();

    console.log(data);

    const padding = 40;

    // Use useEffect hook to load viz on component mount.
    useEffect( () => {
        
        // xScale runs from 1/1/2011 to 12/31/2011, i.e., the extent of the data
        const xScale = d3.scaleTime()
            //.domain([new Date(2011, 0, 1), new Date(2011, 0, 1, 23, 59)])    
            .domain([d3.extent(data, d => d.date)]).nice()
            .range([padding, width - padding])

        // yScale runs from runs from 00:00 - 23:59
        const yScale = d3.scaleTime()
            .domain([new Date(2011, 0, 1), new Date(2011, 0, 1, 23, 59)])
            .range(height - padding, padding)
        
        const monthNames = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Translate 24 hour clock times into 12 hour clock times 
        // for display on the y Axis
        const yAxisLabels = (range) => {
            return range.map( (number) => {
                if (number === 12) {
                    return "noon";
                } else if (number < 12) {
                    return number;
                }
                return (number - 12);
            })
        }

        // Select the svg element using the ref. Deviates from example.
        const dayLength = d3.select(svg.current);
        console.log(dayLength);

        // (Axes implementation deviates from Luke's example.)
        // Create top, bottom, left, and right axes with d3.axis
        // Use xScale and yScale defined above. 
        // Top and bottom axes will have 12 ticks and use month names for labels.
        // Left and right axes will have 24 ticks and use 12 hour clock numbers 
        // for labels.
        const bottomAxis = d3.axisBottom(xScale)
            //.ticks(12)
            .tickValues(monthNames);

        const topAxis = d3.axisTop(xScale)
            //.ticks(12)
            //.tickValues(monthNames);

        const leftAxis = d3.axisLeft(yScale)
            //.ticks(24)
            //.tickValues(yAxisLabels(d3.range(0, 24)));

        const rightAxis = d3.axisRight(yScale)
            //.ticks(24)
            //.tickValues(yAxisLabels(d3.range(0, 24)));

        // Create a group for sunrise and sunset paths.
        const lineGroup = dayLength.append('g')
            .attr('transform', `translate(${padding}, ${padding})`);

        // Draw the background. The part of the background that remains uncovered
        // will represent the daylight hours.
        lineGroup.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('height', (height - padding))
            .attr('width', width - padding)
            .attr('fill', 'lightyellow');

        // Append each axis as a group to the dayLength svg element.
        dayLength.append('g')
            .attr('transform', `translate(${padding}, ${height - padding})`)
            .call(bottomAxis);
        
        dayLength.append('g')
            .attr('transform', `translate(${padding}, ${padding})`)
            .call(topAxis);

        dayLength.append('g')
            .attr('transform', `translate(${padding}, ${padding})`)
            .call(leftAxis);

        dayLength.append('g')
            .attr('transform', `translate(${width - padding}, ${padding})`)
            .call(rightAxis);

        
        // Render the visualization. sunriseLine and sunsetLine are
        // path/area elements (closed svg path elements) that use the date for the
        // x coordinate and sunrise and sunset (repectively) for the y 
        // coordinate. The sunrise shape is anchored at the top of the chart
        // and the sunset area is anchored at the bottom of the chart. 
        // sunriseLine and sunsetLine are actually helper area functions fed to 
        // the path element.
        const sunriseLine = d3.area()
            .x(d => xScale(d.date))
            .y1(d => yScale(new Date(2011, 0, 1, d.sunrise[0], d.sunrise[1])));
        
        const sunsetLine = d3.area()
            .x(d => xScale(d.date))
            .y0(yScale(height))
            .y1(d => yScale(new Date(2011, 0, 1, d.sunset[0], d.sunset[1])));

        // Append paths to the lineGroup and use the area() functions to describe 
        // how the paths will be drawn.
        lineGroup.append('path')
            .datum(data) // datum does not compute a join only data() does, so this is a static viz
            .attr('fill', 'steelblue')
            .attr('d', sunriseLine) // d defines the path to be drawn, i.e. sunriseLine
        
        lineGroup.append('path')
            .datum(data) // datum does not compute a join only data() does, so this is a static viz
            .attr('fill', 'steelblue')
            .attr('d', sunsetLine); // d defines the path to be drawn, i.e. sunsetLine
        
        // Draw a line representing 12 noon across the entire visualization.
        lineGroup.append('line')
            .attr('x1', 0)
            .attr('y1', yScale(new Date(2011, 0, 1, 12)))
            //.attr('y1', d3.precisionRound(yScale(new Date(2011, 0, 1, 12))) + 0.5)
            .attr('x2', width)
            .attr('y2', d3.precisionRound(yScale(new Date(2011, 0, 1, 12))) + 0.5) 
            .attr('stroke', 'lightgray');
    }, []);

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