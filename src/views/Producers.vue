<template>
<div>     
    <PersonFormModal :isActor="false"> </PersonFormModal> 
    <br><br>
    <Row :gutter="20" :type="'flex'">
        <Card v-for="(producer,index) in getAllProducers" :key="index" :producer="producer" :isMovieCard="false" :isActor="false"></Card>
    </Row>
 </div>
</template>

<script>
    import Card from '../components/Card.vue';
    import PersonFormModal from '../components/PersonFormModal.vue';
    import {mapGetters, mapActions} from 'vuex'

    export default {
        computed:{
                ...mapGetters(['getAllProducers']),
        },
        components:{
            Card,PersonFormModal
        },
        methods:{
            ...mapActions(['getProducers'])
        },
        created(){
            this.getProducers()
        }
    }
</script>