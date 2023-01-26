import React, {useEffect, useState} from 'react'
import {Button, Alert} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import axios from 'axios'
import logo from '../assets/chuck-norris.jpg'

const Chistes = () => {

    const [chiste, setChiste] = useState("");
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [votado, setVotado] = useState(false);

    useEffect(() => {
      devolverChistes();
    }, []);

    const devolverChistes = async () => {
        const rChiste = await axios.get('https://api.chucknorris.io/jokes/random');

        setChiste(rChiste.data.value);
        setVotado(false);
    }

    const aumentarLikes = () => {
      if (!votado) {
        setLikes((likes) => likes + 1)
        setVotado(true);
      } else {
        alert("Solo puedes votar una vez por chiste.")
      };
        
    }
    const aumentarDislikes = () => {
      if (!votado) {
        setDislikes((dislikes) => dislikes + 1)
        setVotado(true);
      } else {
        alert("Solo puedes votar una vez por chiste.")
      };
    }

  return (
    <div className='chiste'>
        <h1>Generador de chistes del tito Chuck Norris</h1>
        <img src={logo} alt="chuck norris" />
        <Alert severity="info">{chiste}</Alert>
        <div>
          <Button variant="contained" onClick={devolverChistes}>Generar nuevo chiste</Button>
          <Button variant="contained" startIcon={<ThumbUpIcon />} onClick={aumentarLikes}>{likes}</Button>
          <Button variant="contained" color="error" startIcon={<ThumbDownIcon />} onClick={aumentarDislikes}>{dislikes}</Button>
        </div>
    </div>
  )
}

export default Chistes