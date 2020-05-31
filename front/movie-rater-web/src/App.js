import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import './App.css';

import MovieList from './components/movie-list'
import MovieDetails from './components/movie-details'
import MovieForm from './components/movie-form'

class App extends Component {
  
  state = {
    movies: [],
    selectedMovie: null,
    editedMovie: null,
    token: this.props.cookies.get('mr-token')
  }

  loadMovie = movie => {
    this.setState({selectedMovie: movie, editedMovie: null});
  }
  
  movieDeleted = selectedMovie => {
    const movies = this.state.movies.filter( movie => movie.id !== selectedMovie.id);
    this.setState({movies: movies, selectedMovie: null}) //nowa lista filmow odfiltrowana 
  } 
  
  editClicked = selectedMovie => {
    this.setState({editedMovie: selectedMovie});
  } 

  newMovie = () => {
    this.setState({editedMovie: {title: '', description: ''}});
  }

  cancelForm = () => {
    this.setState({editedMovie: null});
  }

  addMovie = movie => {
    this.setState({movies: [...this.state.movies, movie]});
  }

  componentDidMount(){
    //pobieranie ciasteczka - tokena z django
    if (this.state.token){
      //fetch data
        fetch("http://127.0.0.1:8000/api/movies/", {
          method: 'GET',
          headres: {
            'Authorization' : `Token ${this.props.token}`
          }
        }).then( resp => resp.json())
        .then( res => this.setState({movies: res})) //przekonwertowane do jsona
        .catch( error => console.log(error))
      }else{
        window.location.href = '/';
      }
  }

  render(){
    return (
      <div className="App">
          <h1>
          <i class="fas fa-film"></i>
            <span>Movie Rater</span>
            </h1>
          <div className="layout">
            <MovieList movies={this.state.movies} movieClicked={this.loadMovie}
            movieDeleted={this.movieDeleted} editClicked={this.editClicked}
            newMovie={this.newMovie}  token={this.state.token}
            />
            <div>
              {!this.state.editedMovie ? 
                <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie} token={this.state.token}/>
                :<MovieForm movie={this.state.editedMovie}  cancelForm={this.cancelForm}
                newMovie={this.addMovie} editedMovie={this.loadMovie}  token={this.state.token}/>
              }
            </div>
          </div>
      </div>
    );
  }
}

export default withCookies(App);
