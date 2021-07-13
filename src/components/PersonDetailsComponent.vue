<template>
    <div id="personDetailsComponent" align="center">
                <Card :bordered="false">
                    <p slot="title"> {{person.name}} </p>
                    <div align="left">
                    <p><b>Date of Birth: </b> {{new Date(person.dob).toLocaleDateString()}}</p>
                    <p><b>Gender:</b> {{person.gender}}</p>
                    <br>
                    <DetailsModal :entity="person" :isMovieDetail="false"> </DetailsModal>
                    <Button type="error" ghost @click="deletePerson(person.id)">Delete</Button>
                    </div>
                </Card>
    </div>
</template> 

<script>
import {mapActions} from 'vuex'
import DetailsModal from '../components/DetailsModal.vue'
export default {
    props:['person','isActor'],
    components:{ DetailsModal },
    methods:{
        ...mapActions(['deleteActorAsync','deleteProducerAsync','getActorsAsync','getProducersAsync']),
        async deletePerson(id){
            if (this.isActor){
                await this.deleteActorAsync(id)
                await this.getActorsAsync()
            }
            else {
                await this.deleteProducerAsync(id)
                await this.getProducersAsync()
            }

        }
    }
}
</script>
        
        
        
        
