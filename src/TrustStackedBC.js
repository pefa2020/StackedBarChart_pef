import React, { Component } from "react";
import * as d3 from "d3";

class StackBarChart extends Component {
    componentDidMount() {

        var received_data = [];
        received_data = this.props.data1
        received_data = received_data.map(({ state, political_bias, trust_score }) => ({ state, political_bias, trust_score }))
        console.log("TrustStackedBC data: ", received_data)

        // Format: " { state: state_str, left: average_trust_score, right: avg_trust_score, center: avg_trust_score } "
        // { state: "New Jersey", left: 70, right: 40, center: 30 }
        // state: any of the 51 states ; avg_trust_score (left, right, center): in range from 0 to 100

        const data = [
            { state: "California", left: 70, right: 30, center: 50 },
            { state: "Texas", left: 60, right: 55, center: 50 },
            { state: "Florida", left: 60, right: 50, center: 50 },
            { state: "California", left: 75, right: 40, center: 60 },
            { state: "New York", left: 80, right: 25, center: 55 },
            { state: "Texas", left: 65, right: 50, center: 55 },
            { state: "Florida", left: 55, right: 60, center: 45 },
            { state: "Illinois", left: 75, right: 25, center: 50 },
            { state: "Ohio", left: 60, right: 50, center: 55 },
            { state: "Michigan", left: 70, right: 45, center: 50 },
            { state: "Georgia", left: 55, right: 60, center: 45 },
            { state: "California", left: 65, right: 35, center: 55 },
            { state: "New York", left: 80, right: 30, center: 60 },
            { state: "Texas", left: 60, right: 50, center: 55 },
            { state: "Florida", left: 50, right: 55, center: 50 },
            { state: "Virginia", left: 70, right: 40, center: 60 },
            { state: "New Jersey", left: 65, right: 50, center: 55 },
            { state: "California", left: 75, right: 40, center: 50 },
            { state: "Pennsylvania", left: 65, right: 55, center: 50 },
            { state: "Texas", left: 55, right: 55, center: 50 },
            { state: "Georgia", left: 60, right: 45, center: 50 },
            { state: "Ohio", left: 65, right: 50, center: 55 },
            { state: "Michigan", left: 60, right: 55, center: 50 },
            { state: "Florida", left: 70, right: 45, center: 55 },
            { state: "Illinois", left: 75, right: 30, center: 50 },
            { state: "California", left: 70, right: 30, center: 55 },
            { state: "Texas", left: 60, right: 55, center: 45 },
            { state: "New York", left: 75, right: 35, center: 60 },
            { state: "Florida", left: 60, right: 50, center: 55 }
        ];

        const width = 800;
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 30, left: 60 };

        const svg = d3.select("svg");

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.state))
            .range([margin.left, width - margin.right])
            .padding(0.3);

        const yMax = d3.max(data, d => d.left + d.right + d.center);

        const yScale = d3.scaleLinear()
            .domain([0, yMax])
            .range([height - margin.bottom, margin.top]);

        const colorScale = d3.scaleOrdinal()
            .domain(["left", "right", "center"])
            .range(["#E15759", "#4E79A7", "#F28E2B"]);

        const stackGen = d3.stack()
            .keys(["left", "right", "center"]);

        const stackedSeries = stackGen(data);

        // Drawing bars
        svg.select(".container")
            .selectAll("g")
            .data(stackedSeries)
            .join("g")
            .attr("fill", d => colorScale(d.key))
            .selectAll("rect")
            .data(d => d)
            .join("rect")
            .attr("x", d => xScale(d.data.state))
            .attr("y", d => yScale(d[1]))
            .attr("height", d => yScale(d[0]) - yScale(d[1]))
            .attr("width", xScale.bandwidth());

        // X Axis
        svg.select(".x-axis")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(xScale));

        // Y Axis
        svg.select(".y-axis")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale).ticks(5));

        d3.select("svg")
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -150) // adjust based on SVG height
            .attr("y", 15)   // distance from the left edge
            .attr("text-anchor", "middle")
            .text("Average Trust Score");  //Y-axis label here
    }

    render() {
        return (
            <svg width={800} height={300}>
                <g className="container" />
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
        );
    }
}

export default StackBarChart;
