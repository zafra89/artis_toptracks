import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('')
  const [artist, setArtist] = useState('')


  const search = event => {
    if(event.key === 'Enter') {
      axios
      .get(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${query}&api_key=4f503138c40c29787e2979a5193249ad&format=json`)
      .then(data => {
        const trackList = document.getElementById('track-list')
        const slicedArray = data.data.toptracks.track.slice(0, 10)
        trackList.innerHTML = 
        slicedArray.map(track => {
          return `<li key=${track.mbid}>${track.name}</li>`
        }).join('')
        setArtist(data.data.toptracks["@attr"].artist)
        setQuery('')
      })
    }
  }

  const btnSearch = () => {
    axios
    .get(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${query}&api_key=4f503138c40c29787e2979a5193249ad&format=json`)
    .then(data => {
      const searchBarValue = document.getElementById('search-bar').value
      const trackList = document.getElementById('track-list')
      const slicedArray = data.data.toptracks.track.slice(0, 10)
      setQuery(searchBarValue)
      trackList.innerHTML = 
      slicedArray.map(track => {
        return `<li key=${track.mbid}>${track.name}</li>`
      }).join('')
      setArtist(data.data.toptracks["@attr"].artist)
      setQuery('')
    })
  }

  return (
    <>
    <link href="https://fonts.googleapis.com/css2?family=Tauri&display=swap" rel="stylesheet"></link>
      <h1 className='page-title'>Top 10 Tracks App</h1>
      <div className='inputs'>
        <input 
          id='search-bar' 
          type='text' 
          placeholder='Search band or artist' 
          onChange={event => setQuery(event.target.value)} 
          onKeyPress={search}
          value={query} 
        />
        <button 
          id='search-btn'
          value='button'
          className='btn'
          onClick={btnSearch}
          >Search
        </button>
      </div>
      <h3 id='artist-title'>{artist}</h3>
      <div id='ol-div'>
        <ol id='track-list'></ol>
      </div>
      
    </>
  );
}

export default App;