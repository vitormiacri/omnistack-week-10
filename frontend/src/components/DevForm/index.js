import React, { useState, useEffect } from 'react';

export default function DevForm({ onSubmit }){
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude)
        setLongitude(longitude)
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();


    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    });

    setGithubUsername('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário github</label>
            <input
              name="github_username"
              value={github_username}
              onChange={e => setGithubUsername(e.target.value)} 
              id="github_username"
              required
              />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
              name="techs"
              value={techs}
              onChange={e => setTechs(e.target.value)}
              id="techs"
              required
               />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
                type="number"
                name="latitude"
                id="latitude"
                required
              />
            </div>

            <div className="input-block">
              <label className="iinput-block">Longitude</label>
              <input
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
                type="number"
                name="longitude"
                id="longitude" 
                required
              />
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
  )
}