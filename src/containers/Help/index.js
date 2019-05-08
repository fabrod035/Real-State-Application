import React, {useEffect} from 'react'
import YouTube from 'react-youtube'
import ReactGA from 'react-ga'

export default function Help({history, location}) {
  useEffect(() => {
    history.listen(location => ReactGA.pageview(location.pathname))
  }, [])
  const _onReady = event => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }
  return (
    <div className="container mt-4">
      <h2 className="mt-2 mb-2">How to use?</h2>
      <div className="alert alert-primary mt-2 mb-2" role="alert">
        <b>Alert:</b> This video shows how you can use this web application.
        This is in early stages hence you'll notice big changes over time.
      </div>
      <div className="d-flex justify-content-center mt-2">
        <YouTube videoId="-MuqdAt458I" opts={opts} onReady={_onReady} />
        {/*<p>We are updating please wait.</p>*/}
      </div>
    </div>
  )
}
