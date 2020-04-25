import React, { Component } from 'react';
import { Consumer } from '../../Context';
import axios from 'axios';

export default class Search extends Component {
    state={
        track_title:''
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit=(dispatch,e)=>{
        e.preventDefault();
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.track_title}&page_size=10&page=1&s_track_rating=desc&apikey=e2b0c538cdcd04fb8e59110f1c7e1044`).then(res=>
        {
            dispatch({
                type:'SEARCH_TRACK',
                payload:res.data.message.body.track_list,
            })
            this.setState({track_title:''})
        }).then(err=>console.log(err));
    }
    render() {
        return (
            <Consumer>
                {value=>{
                    const {dispatch}=value
                    return (
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center">
                                <i className='fa fa-music'></i>Search For a Song
                            </h1>
                            <p className="lead text-center">Get the lyrics for every song</p>
                            <form onSubmit={this.handleSubmit.bind(this,dispatch)}>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg" placeholder='Song Title...'
                                    name='track_title'
                                    onChange={this.handleChange}
                                    value={this.state.track_title}/>
                                </div>
                                <button className="btn btn-primary btn-lg btn-block" type="submit">Track Lyrics</button>
                            </form>
                        </div>
                    )

                }}
            </Consumer>
        )
    }
}
