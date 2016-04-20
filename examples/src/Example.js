import React from 'react';
import Sound from 'react-sound';
import PlayerControls from './PlayerControls';
import SongSelector from './SongSelector';
import songs from './songs';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSong: songs[0],
      position: 0,
      playStatus: Sound.status.PLAYING
    };
  }

  render() {
    return <div>
      <SongSelector
        songs={songs}
        selectedSong={this.state.currentSong}
        onSongSelected={this.handleSongSelected.bind(this)} />
      {this.state.currentSong && this.renderCurrentSong()}
      <PlayerControls
        playStatus={this.state.playStatus}
        onPlay={() => this.setState({playStatus: Sound.status.PLAYING})}
        onPause={() => this.setState({playStatus: Sound.status.PAUSED})}
        onResume={() => this.setState({playStatus: Sound.status.PLAYING})}
        onStop={() => this.setState({playStatus: Sound.status.STOPPED, position: 0})}
        onSeek={position => this.setState({ position })}
        duration={this.state.currentSong ? this.state.currentSong.duration : 0}
        position={this.state.position} />
      {this.state.currentSong &&
        <Sound
          url={this.state.currentSong.url}
          playStatus={this.state.playStatus}
          playFromPosition={this.state.position}
          onLoading={({bytesLoaded, bytesTotal}) => console.log(`${bytesLoaded / bytesTotal * 100}% loaded`)}
          onPlaying={({position}) => console.log(position)}
          onFinishedPlaying={() => this.setState({playStatus: Sound.status.STOPPED})} />}
    </div>;
  }

  getStatusText() {
    switch(this.state.playStatus) {
      case Sound.status.PLAYING:
        return 'playing';
      case Sound.status.PAUSED:
        return 'paused';
      case Sound.status.STOPPED:
        return 'stopped';
      default:
        return '(unknown)';
    }
  }

  renderCurrentSong() {
    return <p>
      Current song {this.state.currentSong.title}. Song is {this.getStatusText()}
    </p>;
  }

  handleSongSelected(song) {
    this.setState({currentSong: song, position: 0});
  }
}
