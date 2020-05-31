import React, { Component } from 'react';
import { withCookies } from 'react-cookie';

class MovieDetails extends Component{
    state = {
        highlighted: -1
    }

    highlightRate = high => evt => {
        this.setState({highlighted: high});
    }

    rateClicker = stars => evt => {
        //dane do api django
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/rate_movie/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify({stars: stars+1})
          }).then( resp => resp.json())  //przekonwertowane do jsona
          .then( res => this.getDetails())
          .catch( error => console.log(error))
    }

    getDetails = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${this.props.token}`
            }
          }).then( resp => resp.json())  //przekonwertowane do jsona
          .then( res =>this.props.updateMovie(res))
          .catch( error => console.log(error))
    }
    

    render(){

        const mov = this.props.movie;
        return(
            <React.Fragment>
            {mov ? (
                <div>
                    <h3>{mov.title}</h3>
                    <div className={mov.avg_rating > 0 ? 'full_start': 'empty_star'}></div>
                    <div className={mov.avg_rating > 1 ? 'full_start': 'empty_star'}></div>
                    <div className={mov.avg_rating > 2 ? 'full_start': 'empty_star'}></div>
                    <div className={mov.avg_rating > 3 ? 'full_start': 'empty_star'}></div>
                    <div className={mov.avg_rating > 4 ? 'full_start': 'empty_star'}></div>
                    <p>({mov.no_of_ratings})</p>
                    <p>{mov.description}</p>
                    <div className="rate-container">
                        <h2>Rate it!</h2>
                        { [...Array(5)].map( (e, i) => { //elemnt, index
                            return <div key={i} className={this.state.highlighted > i-1 ? 'purple': 'empty_star'}
                            onMouseEnter={this.highlightRate(i)} onMouseLeave={this.highlightRate(-1)} onClick={this.rateClicker(i)}></div>
                        })}

                    </div>
                </div> 
            ) : null}
            </React.Fragment>
        )
    }
}


export default withCookies(MovieDetails);