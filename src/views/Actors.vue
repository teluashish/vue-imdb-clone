<template>
<div>
    <PersonFormModal :isActor="true"> </PersonFormModal> 
    <br><br>
    <div align="center" id="card-body">
    <Row :gutter="20" :type="'flex'">
        <Card v-for="(actor,index) in getAllActors" :key="index" :actor="actor" :isMovieCard="false" :isActor="true"></Card>
    </Row> 
    </div>
 </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import Card from '../components/Card.vue';
    import PersonFormModal from '../components/PersonFormModal.vue';

    
    export default {
        computed:{
            ...mapGetters(['getAllActors']),
        },
        components:{
            Card,
            PersonFormModal
        },
        methods:{
            ...mapActions(['getActors'])
        },
        created(){
            this.getActors()
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