<template>
    <Col :xs="20" :sm="16" :md="12" :lg="8" :xl="6">
        <div id = "cardComponent" align="center">
            <MovieDetailsComponent v-if = "isMovieCard" :movie="movie" />
            <PersonDetailsComponent v-if = "!isMovieCard" :person = "isActor ? actor : producer" :isActor="isActor" />
        </div>
    </Col>
</template>

<script>
import MovieDetailsComponent from '../components/MovieDetailsComponent.vue'
import PersonDetailsComponent from '../components/PersonDetailsComponent.vue'

export default {
    props:['movie','actor','producer','isMovieCard','isActor'],
    components:{
         MovieDetailsComponent, PersonDetailsComponent
    }

}
</script>

<style scoped>
#cardComponent{
    height: 100%;
    width: 100%;
}
</style>