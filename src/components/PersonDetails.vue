<template>
    <div id="personDetailsComponent" align="center">
                <Card :bordered="false">
                    <p slot="title"> {{person.name}} </p>
                    <div align="left">
                    <p><b>Date of Birth: </b> {{formattedDOB}}</p>
                    <p><b>Gender:</b> {{person.gender}}</p>
                    <br>
                    <details-modal :entity="person" :isMovieDetail="false"> </details-modal>
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
    computed:{
        formattedDOB(){
            return new Date(this.person.dob).toLocaleDateString()
        }
    },
    methods:{
        ...mapActions(['deleteActor','deleteProducer','getActors','getProducers']),
        async deletePerson(id){
            if (this.isActor){
                await this.deleteActor(id)
                await this.getActors()
            }
            else {
                await this.deleteProducer(id)
                await this.getProducers()
            }

        }
    }
}
</script>
        
        
        
        
