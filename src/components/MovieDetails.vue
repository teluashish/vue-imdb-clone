<template>
    <div id="movieDetailsComponent">
                <Card :bordered="false">
                    <p slot="title"> {{movie.name}} </p>
                    <img :src="movie.coverImage" /> <br /><br />
                    <div align="left">
                    <p><b>Year of release: </b> {{movie.year}}</p>
                    <p><b>Actors: </b> <span v-for="(actor,index) in movie.actors" :key="index"> {{actor.name}}<span v-if="index+1 < movie.actors.length">, </span></span></p>
                    <p><b>Genres: </b> <span v-for="(genre,index) in movie.genres" :key="index"> {{genre.name}}<span v-if="index+1 < movie.genres.length">, </span> </span></p>
                    <p><b>Producer: </b> {{getProducerName(movie.producerId)}}</p><br />

                    <details-modal :entity="movie" :isMovieDetail="true"> </details-modal>
                    <movie-form-modal :isEdit="true" :movie="movie" ></movie-form-modal>
                    <Button type="error" ghost @click="deleteMovieById(movie.id)">Delete</Button>
                    </div>
                </Card>
    </div>
</template> 

<script>
import DetailsModal from '../components/DetailsModal.vue'
import MovieFormModal from './MovieFormModal.vue'
import { mapActions, mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters(['producers'])
    },
    props:['movie'],

    components:{ DetailsModal, MovieFormModal },
    methods:{
        ...mapActions(['deleteMovie','getProducers','getActors','getMovies']),
    
        async deleteMovieById(id){
            await this.deleteMovie(id)
            await this.getMovies()
        },
        getProducerName(){
            if (this.producers!==null){
                for(var i=0;i<this.producers.length;i++){
                    if(this.movie.producerId === this.producers[i]['id']) return this.producers[i]['name']
                }
            }
        }
    },
    created(){
        this.getProducers()
        this.getActors()
        
    }
}
</script>
        
        
        
<style scoped>
img{
    height : 180;
    width : 90%;
    border-radius:2%;
}
</style>     
