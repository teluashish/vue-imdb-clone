import Vuex from 'vuex'
import axios from 'axios'
import Vue from 'vue'


Vue.use(Vuex)

export const store = new Vuex.Store({

    state :{
        movies : null,
        actors : null,
        producers : null,
        genres: null
    },

    getters: {
        getAllMovies: state => state.movies ,
        getAllActors: state => state.actors,
        getAllProducers: state => state.producers,
        getAllGenres: state => state.genres,
    },

    mutations: {
        assignMovies(state , movies){
            state.movies = movies
        },
        assignActors(state , actors){
            state.actors = actors
        },
        assignProducers(state , producers){
            state.producers = producers
        },
        assignGenres(state , genres){
            state.genres = genres
        }


    },

    actions: {
        async getMovies(context){
            await axios.get('/movies').then( movies =>
                context.commit('assignMovies',movies['data'])).catch( error =>
                    window.alert('movies fetch: '+error)
                )
        },

        async postMovie(context, movie){
            if(movie.coverImage!=''){
                await axios.post('/movies/upload',movie.coverImage).then( response =>{
                    movie.coverImage = response.data
                }).catch(error => window.alert(error))
            }
            await axios.post('/movies/',movie).then(movieId => 
                    console.log('added movie id: '+movieId)).catch(error => 
                        window.alert('add movie: '+error))
        },


        async putMovie(context, {movie,movieId}){
            if(movie.coverImage!=''){
                await axios.post('/movies/upload',movie.coverImage).then( response =>
                    movie.coverImage = response.data
                ).catch(error => window.alert(error))
            }
            await axios.put('/movies/'+movieId, movie).then(movieId => 
                console.log('updated movie id: '+movieId)).catch(error => 
                    window.alert('movie uodate '+error))
        },
        async deleteMovie(context, movieId){
            await axios.delete('/movies/'+movieId).then(movieId => 
                console.log('deleted '+movieId)).catch(error => 
                    window.alert('movie deletion '+movieId+' '+error))
        },

        //Actors
        async getActors(context){
            await axios.get('/actors').then( actors => 
                context.commit('assignActors',actors['data'])).catch( error =>
                    window.alert('actors fetch: '+error)
                )
            
        },
       async postActor(context, actor){
            await axios.post('/actors/',actor).then(actorId => 
                console.log('added actor id: '+actorId)).catch(error => 
                    window.alert('add actor: '+error));
        },
        async putActor(context, actor, actorId){
            await axios.put('/actors/'+actorId, actor).then(actorId => 
                console.log('updated actor id: '+actorId)).catch(error => 
                    window.alert('actor update '+error));
        },
        async deleteActor(context, actorId){
            await axios.delete('/actors/'+actorId).then(actorId => 
                console.log(actorId)).catch(error => 
                    window.alert('actor deletion '+actorId+' '+error))
        },

        //Producers
        async getProducers(context){
            await axios.get('/producers').then( producers => 
                context.commit('assignProducers',producers['data'])).catch( error =>
                    window.alert('producers fetch: '+error)
                )
        },
        async postProducer(context, producer){
            await axios.post('/producers/',producer).then(producerId => 
                console.log('added producer id: '+producerId)).catch(error => 
                    window.alert('add producer: '+error));
        },
        async putProducer(context, producer, producerId){
            await axios.put('/producers/'+producerId, producer).then(producerId => 
                console.log('updated producer id: '+producerId)).catch(error => 
                    window.alert('producer update '+error));
        },
        async deleteProducer(context, producerId){
            await axios.delete('/producers/'+producerId).then(producerId => 
                console.log('deleted '+producerId)).catch(error => 
                    window.alert('producer deletion '+producerId+' '+error))
        },


        //Genres
        async getGenres(context){
            await axios.get('/genres').then( genres => 
                context.commit('assignGenres',genres['data'])).catch( error =>
                    window.alert('genres fetch: '+error)
                )
        },
        
        async postGenre(context, genre){
            await axios.post('/genres/',genre).then(genreId => 
                console.log('added genre id: '+genreId)).catch(error => 
                    window.alert('add genre: '+error));
        },

        async deleteGenre(context, genreId){
            await axios.delete('/genres/'+genreId).then(genreId => 
                console.log('deleted '+genreId)).catch(error => 
                    window.alert('genre deletion '+genreId+' '+error))
        }
    }

})

