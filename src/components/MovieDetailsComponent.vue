<template>
    <div id="movieDetailsComponent">
                <Card :bordered="false">
                    <p slot="title"> {{movie.name}} </p>
                    <img :src="movie.coverImage" /> <br /><br />
                    <div align="left">
                    <p><b>Year of release: </b> {{movie.year}}</p>
                    <p><b>Actors: </b> <span v-for="(actor,idx) in movie.actors" :key="actor.id"> {{actor.name}}<span v-if="idx+1 < movie.actors.length">, </span></span></p>
                    <p><b>Genres: </b> <span v-for="(genre,idx) in movie.genres" :key="genre.id"> {{genre.name}}<span v-if="idx+1 < movie.genres.length">, </span> </span></p>
                    <p><b>Producer: </b> {{getProducerName(movie.producerId)}}</p><br />
                    </div>
                    <DetailsModal :entity="movie" :isMovieDetail="true"> </DetailsModal> 
                    <FormModal :isEdit="true" :movie="movie" ></FormModal>
                    <Button type="error" ghost @click="deleteMovie(movie.id)">Delete</Button>
                </Card>
    </div>
</template> 

<script>
import DetailsModal from '../components/DetailsModal.vue'
import FormModal from '../components/FormModal.vue'
import { mapActions, mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters(['getProducers'])
    },
    props:['movie'],

    components:{ DetailsModal, FormModal },
    methods:{
        ...mapActions(['deleteMovieAsync','getProducersAsync','getActorsAsync','getMoviesAsync']),
    
        async deleteMovie(id){
            await this.deleteMovieAsync(id)
            await this.getMoviesAsync()
        },
        getProducerName(){
            if (this.getProducers!==null){
                for(var i=0;i<this.getProducers.length;i++){
                    if(this.movie.producerId === this.getProducers[i]['id']) return this.getProducers[i]['name']
                }
            }
        }
    },
    created(){
        this.getProducersAsync()
        this.getActorsAsync()
        
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
