import React, { Component } from "react";
import * as d3 from 'd3';

export default class SentimentStackedBC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        console.log("TrustStackedBC data: ", this.props.data2)
    }
    // Sentiment score vs number of shares
    render() {
        return (
            <div>
                SentimentStackedBC
            </div>
        )
    }
}