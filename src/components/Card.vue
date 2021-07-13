<template>
    <Col :xs="20" :sm="16" :md="12" :lg="8" :xl="6">
        <div id = "card" align="center">
            <MovieDetails v-if="isMovieCard" :movie="movie" />
            <PersonDetails v-if="!isMovieCard" :person="person" :isActor="isActor" />
        </div>
    </Col>
</template>

<script>
import MovieDetails from './MovieDetails.vue'
import PersonDetails from './PersonDetails.vue'

export default {
    props:['movie','actor','producer','isMovieCard','isActor'],
    components:{
         MovieDetails, PersonDetails
    },
    computed:{
        person(){
            return this.isActor ? this.actor : this.producer
        }
    }

}
</script>

<style scoped>
#card{
    height: 100%;
    width: 100%;
}
</style>