import React, { Component } from 'react';
import { withCookies } from 'react-cookie';

class MovieForm extends Component{
    state = {
        editedMovie: this.props.movie //props are immutable; separate object for editing
    }

    inputChanged = event => {
        let movie = this.state.editedMovie;
        movie[event.target.name] = event.target.value;
        this.setState({editedMovie: movie});
    }

    cancelClicked = () => {
        this.props.cancelForm();
    }

    saveClicked = () => {
        console.log("this.props.token: ", this.props.token);
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.editedMovie)
          }).then( resp => resp.json())  //przekonwertowane do jsona
          .then( res => this.props.newMovie(res))
          .catch( error => console.log(error))
    }

    updateClicked = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.editedMovie)
          }).then( resp => resp.json())  //przekonwertowane do jsona
          .then( res => this.props.editedMovie(res))
          .catch( error => console.log(error))
    }

    render(){

        const isDisabled = this.state.editedMovie.title.length === 0 || 
                            this.state.editedMovie.description.length === 0;

        return(
            <React.Fragment>
                <span>Title</span><br/>
                <input type="text" name="title" value={this.props.movie.title} 
                onChange={this.inputChanged}/> <br/>

                <span>Description</span><br/>
                <textarea name="description" value={this.props.movie.description} 
                onChange={this.inputChanged}/><br/>

                {/* jak jest id to znaczy że sa dane z naszej bazy danych */}
                {this.props.movie.id ? 
                    <button disabled={isDisabled} onClick={this.updateClicked}>Update</button> 
                    : <button disabled={isDisabled} onClick={this.saveClicked}>Save</button>
                }
                &nbsp;
                <button onClick={this.cancelClicked}>Cancel</button>
            </React.Fragment>
        )
    }
}


export default withCookies(MovieForm);