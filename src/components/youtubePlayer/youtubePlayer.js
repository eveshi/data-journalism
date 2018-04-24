import React, { Component } from 'react';
import classes from './youtubePlayer.css'

class Player extends Component {

    componentWillMount(){
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    onYouTubeIframeAPIReady(player) {
        let YT = window.YT
        player = YT.Player('player', {
          events: {}
        })}

    render(){
        return(
            <div className={classes.container16x9}>
            <iframe id="player" type="text/html" className={classes.player} 
            src={this.props.videoUrl+"?enablejsapi=1&origin=http://localhost:3000/"} 
            frameBorder="0" allowFullScreen></iframe>
            </div>
        )
    }
}

export default Player;
