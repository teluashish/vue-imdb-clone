<template>
<div>
    <person-form-modal :isActor="true"> </person-form-modal> 
    <br><br>
    <div align="center" id="card-body">
    <Row :gutter="20" :type="'flex'">
        <card-details v-for="(actor,index) in actors" :key="index" :actor="actor" :isMovieCard="false" :isActor="true"></card-details>
    </Row> 
    </div>
 </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import CardDetails from '../components/CardDetails.vue';
    import PersonFormModal from '../components/PersonFormModal.vue';

    
    export default {
        computed:{
            ...mapGetters(['actors']),
        },
        components:{
            CardDetails,
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