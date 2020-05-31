import React from 'react';
import { withCookies } from 'react-cookie';


function MovieList(props){

    const movieClicked = movie => evt => {
        console.log("movieClicked")
        props.movieClicked(movie);
    };   
    
    const editClicked = movie => {
        props.editClicked(movie)
        
    };

    const removedClicked = movie => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`, { //movie z argumentu funckji
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${props.token}`
            },
          }).then( resp => props.movieDeleted(movie)) //movie z argumentu funckji
          .catch( error => console.log(error))
    };

    const newMovie = () => {
        props.newMovie();
    };

    
    return (
        <div>
            {props.movies.map( movie => {
                return (
                    <div key={movie.id} className="movie-item">
                        <h3 onClick={movieClicked(movie)}>
                            {movie.title}
                        </h3>
                        <i class="fas fa-edit" onClick={ () => editClicked(movie)}></i> 
                        <i class="fa fa-trash-o" onClick={ () => removedClicked(movie)}></i> 
                    </div>
                )
            })}
            <button onClick={newMovie}>Add new</button>
        </div>
    )
}

export default withCookies(MovieList);   