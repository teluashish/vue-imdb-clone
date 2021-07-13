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
        getMovies: state => state.movies ,
        getActors: state => state.actors,
        getProducers: state => state.producers,
        getGenres: state => state.genres,
        getPersonValidationDescriptor: getAgeFunc => {
            
            const descriptor = {
            name: {
              type: 'string',
              required: true,
              trigger: 'blur',
              validator: (rule, value) => /^[a-z0-9]+$/.test(value),
            },

            dob: {
              type: 'date',
              required: true,
              trigger: 'change',
              asyncValidator: (rule, value) => {
                var age = getAgeFunc(value)
                return new Promise((resolve, reject) => {
                  if (age < 18) {
                    reject('too young');  
                  } else {
                    resolve();
                  }
                });
              },
            },
            
            bio: {
                type: 'string',
                trigger: 'blur',
                message: 'Please enter introduction',
                required: true, 
            },

            gender: {
                required: true,
                trigger: 'change',
                message: 'please select gender'
            }
          };
        return descriptor;
        }
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
        async getMoviesAsync(context){
            await axios.get('/movies').then( movies =>
                context.commit('assignMovies',movies['data'])).catch( error =>
                    window.alert('movies fetch: '+error)
                )
        },

        async postMovieAsync(context, movie){
            await axios.post('/movies/upload',movie.coverImage).then( response =>{
                movie.coverImage = response.data
                console.log(movie)
            }
                ).catch(error => window.alert(error))
            await axios.post('/movies/',movie).then(movieId => 
                    console.log('added movie id: '+movieId)).catch(error => 
                        window.alert('add movie: '+error))
        },


        async putMovieAsync(context, {movie,movieId}){
            movie, movieId
            console.log("putMovieAsync",movieId)
            await axios.post('/movies/upload',movie.coverImage).then( response =>
                movie.coverImage = response.data
            ).catch(error => window.alert(error))
            await axios.put('/movies/'+movieId, movie).then(movieId => 
                console.log('updated movie id: '+movieId)).catch(error => 
                    window.alert('movie uodate '+error))
        },
        async deleteMovieAsync(context, movieId){
            await axios.delete('/movies/'+movieId).then(movieId => 
                console.log('deleted '+movieId)).catch(error => 
                    window.alert('movie deletion '+movieId+' '+error))
        },

        //Actors
        async getActorsAsync(context){
            await axios.get('/actors').then( actors => 
                context.commit('assignActors',actors['data'])).catch( error =>
                    window.alert('actors fetch: '+error)
                )
            
        },
       async postActorAsync(context, actor){
            await axios.post('/actors/',actor).then(actorId => 
                console.log('added actor id: '+actorId)).catch(error => 
                    window.alert('add actor: '+error));
        },
        async putActorAsync(context, actor, actorId){
            await axios.put('/actors/'+actorId, actor).then(actorId => 
                console.log('updated actor id: '+actorId)).catch(error => 
                    window.alert('actor update '+error));
        },
        async deleteActorAsync(context, actorId){
            await axios.delete('/actors/'+actorId).then(actorId => 
                console.log(actorId)).catch(error => 
                    window.alert('actor deletion '+actorId+' '+error))
        },

        //Producers
        async getProducersAsync(context){
            await axios.get('/producers').then( producers => 
                context.commit('assignProducers',producers['data'])).catch( error =>
                    window.alert('producers fetch: '+error)
                )
        },
        async postProducerAsync(context, producer){
            await axios.post('/producers/',producer).then(producerId => 
                console.log('added producer id: '+producerId)).catch(error => 
                    window.alert('add producer: '+error));
        },
        async putProducerAsync(context, producer, producerId){
            await axios.put('/producers/'+producerId, producer).then(producerId => 
                console.log('updated producer id: '+producerId)).catch(error => 
                    window.alert('producer update '+error));
        },
        async deleteProducerAsync(context, producerId){
            await axios.delete('/producers/'+producerId).then(producerId => 
                console.log('deleted '+producerId)).catch(error => 
                    window.alert('producer deletion '+producerId+' '+error))
        },


        //Genres
        async getGenresAsync(context){
            await axios.get('/genres').then( genres => 
                context.commit('assignGenres',genres['data'])).catch( error =>
                    window.alert('genres fetch: '+error)
                )
        },
        
        async postGenreAsync(context, genre){
            await axios.post('/genres/',genre).then(genreId => 
                console.log('added genre id: '+genreId)).catch(error => 
                    window.alert('add genre: '+error));
        },

        async deleteGenreAsync(context, genreId){
            await axios.delete('/genres/'+genreId).then(genreId => 
                console.log('deleted '+genreId)).catch(error => 
                    window.alert('genre deletion '+genreId+' '+error))
        }
    }

})

