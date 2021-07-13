
<template>
<div>
    <br>
    <FormModal :isEdit="false" ></FormModal>
    <br><br>
    <br>
    <div align="center">
    <Row :gutter="20" :type="'flex'">
        <CardComponent v-for="(movie,idx) in getMovies" :key="idx" :movie="movie" :isMovieCard="true"></CardComponent>
    </Row>
    </div>
 </div>
</template>

<script>
    import CardComponent from '../components/CardComponent.vue';
    import FormModal from '../components/FormModal.vue';
    import {mapGetters, mapActions} from 'vuex'
    
    
    export default {

        computed:{
                ...mapGetters(['getMovies']),
        },
        methods:{
                ...mapActions(['getMoviesAsync'])
        },
        components:{
            CardComponent,FormModal
        },

        created(){
            this.getMoviesAsync()
        }
    }
</script>