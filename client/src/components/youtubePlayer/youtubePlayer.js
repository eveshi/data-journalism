import React, { Component } from 'react';

class Player extends Component {
    state={

    }

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
            <iframe id="player" type="text/html" width="640" height="360" 
            src={this.props.videoUrl+"?enablejsapi=1&origin=http://localhost:3000/"} frameBorder="0"></iframe>
        )
    }
}

export default Player;
