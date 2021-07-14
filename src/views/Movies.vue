
<template>
<div>
    <br>
    <movie-form-modal :isEdit="false" ></movie-form-modal>
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
    import MovieFormModal from '../components/MovieFormModal.vue';
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
            MovieFormModal
        },

        created(){
            this.getMovies()
        }
    }
</script>