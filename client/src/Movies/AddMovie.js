import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';

const MovieUpdate = props => {
    const [updatedMovie, setUpdatedMovie] = useState({ id: new Date(), title: '', director:'', metascore: '', stars: ['','',''] });
    const history = useHistory();

    const handleChange = e => {
        setUpdatedMovie({
            ...updatedMovie,
            [e.target.name]: e.target.value
        })
        console.log(updatedMovie)
    }

    const handleStarsChange = e => {
        const actionIndex = parseInt(e.target.name.slice(5))
        setUpdatedMovie({...updatedMovie,
        stars: updatedMovie.stars.map( (item, index) => index === actionIndex ? e.target.value : item)
        })
        
        console.log(updatedMovie)
    }

    const update = e => {
        e.preventDefault();
        setUpdatedMovie({...updatedMovie, id: props.newId})
        axios
            .post(`http://localhost:5000/api/movies`, updatedMovie)
            .then( res => {
                console.log(res) 
                history.push('/')
            })
            .catch(error => console.log(error))
        props.setUpdate(!props.update)
        props.setNewId(props.newId+1)
    }
    console.log(props)
    return (
        <div>
            <form onSubmit={update}>
                <label>
                    Title:
                    <input type='text' name='title' onChange={handleChange}/>
                </label>

                <label>
                    Director:
                    <input type='text' name='director' onChange={handleChange}/>
                </label>

                <label>
                    Metascore:
                    <input type='text' name='metascore' onChange={handleChange}/>
                </label>

                <label>
                    Stars:
                    <input type='text' name='stars0' value={updatedMovie.stars[0]} onChange={handleStarsChange}/>
                    <input type='text' name='stars1' value={updatedMovie.stars[1]} onChange={handleStarsChange}/>
                    <input type='text' name='stars2' value={updatedMovie.stars[2]} onChange={handleStarsChange}/>
                </label>
                <input type='submit' />
            </form>
        </div>
    );
};

export default MovieUpdate;