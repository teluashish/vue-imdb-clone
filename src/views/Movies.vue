
<template>
<div>
    <br>
    <movie-form :isEdit="false" ></movie-form>
    <br><br>
    <br>
    <div align="center">
    <Row :gutter="20" :type="'flex'">
        <card-details v-for="(movie,index) in movies" :key="index" :movie="movie" :isMovieCard="true"></card-details>
    </Row>
    </div>
 </div>
</template>

<script>
    import CardDetails from '../components/CardDetails.vue';
    import MovieForm from '../components/MovieForm.vue';
    import {mapGetters, mapActions} from 'vuex'
    
    
    export default {

        computed:{
                ...mapGetters(['movies']),
        },
        methods:{
                ...mapActions(['getMovies'])
        },
        components:{
            CardDetails,
            MovieForm
        },

        created(){
            this.getMovies()
        }
    }
</script>