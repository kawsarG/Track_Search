import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

class Lyrics extends Component {
    state={
        lyric:{},
        track:{}
    }
    componentDidMount(){
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=e2b0c538cdcd04fb8e59110f1c7e1044`).then(res=>
        {
            this.setState({lyric:res.data.message.body.lyrics});
            return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=e2b0c538cdcd04fb8e59110f1c7e1044`).then(res=>{
                this.setState({track:res.data.message.body.track});
            })
        }).then(err=>console.log(err));
    }
    
    render() {

        const {track,lyric}=this.state;
        console.log(track)
        if(track===undefined || lyric===undefined || Object.keys(track).length===0||
        Object.keys(lyric).length===0){
            return <Spinner></Spinner>
        }
        else{
            return (
                <React.Fragment>
                    <div className="card">
                        <h5 className="card-header">
                        {track.track_name} by <span className="text-secondary"> {track.artist_name}</span>
                        </h5>
                        <div className="card-body">
                            <p className="card-text">
                                {lyric.lyrics_body}
                            </p>
                        </div>
                    </div>
                    <ul className="list-group mt-3">
                       <li className="list-group-item">
                           <strong>Album</strong>: {track.album_id}
                       </li>
                      
                       <li className="list-group-item">
                           <strong>Explicit Words</strong>: {track.explicit===0?'NO':'YES'}
                       </li>
                       <li className="list-group-item">
                           <strong>Track Rating</strong>: {track.first_release_date}
                       </li>
                    </ul>
                    <Link to='/' className='btn btn-sm btn-dark mt-4 btn-block p-3'>Go Back</Link>
                </React.Fragment>
            )
        }
    }
}
export default Lyrics;