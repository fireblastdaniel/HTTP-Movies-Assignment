import React, { useState, useEffect } from 'react'

const MovieUpdate = props => {
    const [updatedMovie, setUpdatedMovie] = useState(props.movie);

    const handleChange = e => {
        setUpdatedMovie({
            ...updatedMovie,
            [e.target.name]: e.target.value
        })
    }

    const handleStarsChange = e => {
        const actionIndex = e.target.name.slice(5)
        setUpdatedMovie({...updatedMovie,
        stars: updatedMovie.stars.map( (item, index) => index === actionIndex ? e.target.value : item)
        })
    }

    const update = () => {

    }

    return (
        <div>
            <form onSubmit={update}>
                <label>
                    Title:
                    <input type='text' name='title' value={props.movie.title} onChange={handleChange}/>
                </label>

                <label>
                    Director:
                    <input type='text' name='director' value={props.movie.director} onChange={handleChange}/>
                </label>

                <label>
                    Metascore:
                    <input type='text' name='metascore' value={props.movie.metascore} onChange={handleChange}/>
                </label>

                <label>
                    Stars:
                    <input type='text' name='stars0' value={props.movie.stars[0]} onChange={handleStarsChange}/>
                    <input type='text' name='stars1' value={props.movie.stars[1]} onChange={handleStarsChange}/>
                    <input type='text' name='stars2' value={props.movie.stars[2]} onChange={handleStarsChange}/>
                </label>
                <input type='submit' />
            </form>
        </div>
    );
};

export default MovieUpdate;