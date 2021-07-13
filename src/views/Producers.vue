<template>
<div>     
    <PersonFormModal :isActor="false"> </PersonFormModal> 
    <br><br>
    <Row :gutter="20" :type="'flex'">
        <CardComponent v-for="(producer,idx) in getProducers" :key="idx" :producer="producer" :isMovieCard="false" :isActor="false"></CardComponent>
    </Row>
 </div>
</template>

<script>
    import CardComponent from '../components/CardComponent.vue';
    import PersonFormModal from '../components/PersonFormModal.vue';
    import {mapGetters, mapActions} from 'vuex'

    export default {
        computed:{
                ...mapGetters(['getProducers']),
        },
        components:{
            CardComponent,PersonFormModal
        },
        methods:{
            ...mapActions(['getProducersAsync'])
        },
        created(){
            this.getProducersAsync()
        }
    }
</script>