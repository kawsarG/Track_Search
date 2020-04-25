import React, { Component } from 'react'
import Tracks from '../tracks/Tracks'
import Search from '../tracks/Search';

class Index extends Component {
    render() {
        return (
            <React.Fragment>
                <Search></Search>
                <Tracks></Tracks>
            </React.Fragment>
        )
    }
}
export default Index;