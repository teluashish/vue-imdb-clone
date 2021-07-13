<template>
<div>
    <PersonFormModal :isActor="true"> </PersonFormModal> 
    <br><br>
    <div align="center" id="card-body">
    <Row :gutter="20" :type="'flex'">
        <CardComponent v-for="(actor,idx) in getActors" :key="idx" :actor="actor" :isMovieCard="false" :isActor="true"></CardComponent>
    </Row> 
    </div>
 </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import CardComponent from '../components/CardComponent.vue';
    import PersonFormModal from '../components/PersonFormModal.vue';

    
    export default {
        computed:{
            ...mapGetters(['getActors']),
        },
        components:{
            CardComponent,
            PersonFormModal
        },
        methods:{
            ...mapActions(['getActorsAsync'])
        },
        created(){
            this.getActorsAsync()
        }
    }
</script>
<style scoped>
#card-body{
    margin: auto;
    padding: 10px;
    text-align: center;
}
</style>