
<template>
<div>
    <br>
    <MovieFormModal :isEdit="false" ></MovieFormModal>
    <br><br>
    <br>
    <div align="center">
    <Row :gutter="20" :type="'flex'">
        <Card v-for="(movie,index) in getAllMovies" :key="index" :movie="movie" :isMovieCard="true"></Card>
    </Row>
    </div>
 </div>
</template>

<script>
    import Card from '../components/Card.vue';
    import MovieFormModal from '../components/MovieFormModal.vue';
    import {mapGetters, mapActions} from 'vuex'
    
    
    export default {

        computed:{
                ...mapGetters(['getAllMovies']),
        },
        methods:{
                ...mapActions(['getMovies'])
        },
        components:{
            Card,
            MovieFormModal
        },

        created(){
            this.getMovies()
        }
    }
</script>