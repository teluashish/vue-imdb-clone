<template>
    <span id="formModal">
        <Button type="primary" ghost @click="movieModal = true">{{ isEdit ? 'Edit Movie' : '+ Add Movie'}}</Button>
        <Modal v-model="movieModal" width="600">
            <p slot="header" style="text-align:center">
                <span>Fill Movie Details</span>
            </p>
            <div style="text-align:center">
                <Form :model="formItemToCopy" :label-width="120"  ref="formItem">
                    <FormItem label="Title" prop="name">
                       <Input v-model="formItemToCopy.name" type="text" placeholder="Enter title for the movie"></Input>
                    </FormItem>

                   <FormItem label="Year" prop="year">
                      <Input v-model="formItemToCopy.year" type="number" placeholder="Enter movie release year"></Input>
                    </FormItem>

                    <FormItem label="Select Actors" prop="actorIds">

                           <Select v-model="formItemToCopy.actorIds" multiple  placeholder="Select Actors ">
                                <Option v-for="actor in getActors" :value="actor.id" :key="actor.id">{{ actor.name }}</Option>
                            </Select>
                    </FormItem>

                    <FormItem label="Select Genres" prop="genreIds">
                           <Select v-model="formItemToCopy.genreIds" multiple  placeholder="Select Genres ">
                                <Option v-for="genre in getGenres" :value="genre.id" :key="genre.id">{{ genre.name }}</Option>
                            </Select>
                    </FormItem>

                    <FormItem label="Select Producer" prop="producerId">
                           <Select v-model="formItemToCopy.producerId" placeholder="Select Producer ">
                                <Option v-for="producer in getProducers" :value="producer.id" :key="producer.id">{{ producer.name }}</Option>
                            </Select>
                    </FormItem>

                    <FormItem label="Choose a Cover Image " >
                        <Upload
                            :before-upload="handleUpload"
                            action=" "
                            >
                            <Button >Select the file to upload</Button>
                        </Upload>
                        <div v-if="file !== null">Upload file: {{ file.name }} </div>
                    </FormItem>


                    <FormItem label="Plot" prop="plot">
                       <Input v-model="formItemToCopy.plot" type="textarea" maxlength="500" :autosize="{minRows: 2,maxRows: 10}" show-word-limit clearable placeholder="Enter plot of the movie..."></Input>
                    </FormItem>

                </Form>

            </div>

            <div slot="footer">
                <Button type="primary" @click="handleSubmit()">Submit</Button>
            </div>
        </Modal>
    </span>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import Schema from 'async-validator'

const descriptor = {
    formItem:{
        type: 'object',
        required: true,
        fields:{
            name: [ {required:true, type: 'string', pattern: new RegExp(/^[a-z ,.'-]+$/i), message:'Invalid full name'}],

            actorIds: [
                { required: true, type: 'array', min: 1, message: 'Choose at least one actor'},
                { type: 'array', max: 10, message: 'Choose ten actors at best' }
            ],

            genreIds: [
                { required: true, type: 'array', min: 1, message: 'Choose at least one genre' },
                { type: 'array', max: 10, message: 'Choose ten genres at best'  }
            ],

            producerId: [
                { required: true, type: 'number', message: 'Please select a producer'  },
            ],

            year: {required: true,  message: 'Enter valid Year of release '},

 
            plot: [ { required: true, message: 'Please summarize the movie'},
                   {type: 'string', min: 10, message: 'Number of characters cannot be less than 10'},
                   {type: 'string', max: 500, message: 'Limit the number of characters to 500'} ],

            //coverImage: {type: 'any', required:true, message: 'Cover image is required'}

        }
    }    
}

const validator = new Schema(descriptor)

export default {
        computed:{
            ...mapGetters(['getGenres','getActors','getProducers']),
        },
        props:['movie','isEdit'],
        data(){
            return {
                movieModal: false,
                loadingStatus:false,
                file:null,
                formItem: {
                    name: '',
                    movieActorMappingString: '',
                    producerId:'',
                    movieGenreMappingString: '',
                    year: '',
                    plot: '',
                    coverImage:''
                },
                formItemToCopy: {
                    name: '',
                    actorIds:[],
                    genreIds:[],
                    producerId:'',
                    year: '',
                    plot: '',
                    coverImage:''
                }
            }

        },
        methods: {
            ...mapActions(['postMovieAsync','putMovieAsync','getGenresAsync','getMoviesAsync']),
            submit () {
                console.log("submit")
                this.movieModal = false
                this.modify()
                if(!this.isEdit)this.add()
                else this.edit(this.movie.id)
                this.makeEmpty()
            },

            makeEmpty(){
                console.log("makeEmpty")
                this.formItemToCopy.name = ''
                this.formItemToCopy.actorIds = []
                this.formItemToCopy.genreIds = []
                this.formItemToCopy.producerId = ''
                this.formItemToCopy.year = ''
                this.formItemToCopy.plot = ''
                this.formItemToCopy.coverImage = ''
            },
            
            async edit(id){

                await this.putMovieAsync({movie: this.formItem,movieId: id})
                await this.getMoviesAsync()
            },
            async add(){
                console.log("add",this.formItem)
                await this.postMovieAsync(this.formItem)
                await this.getMoviesAsync()
            },

            handleSubmit () {
                console.log("handleSubmit")
                validator.validate({formItem: this.formItemToCopy}).then(() => this.submit()).catch((errors, fields) => console.log(fields,errors))
            },




            modify(){ 
                console.log("modify")
                this.formItem.name = this.formItemToCopy.name
                this.formItem.producerId = parseInt(this.formItemToCopy.producerId)
                this.formItem.movieActorMappingString = this.formItemToCopy.actorIds.join(',')
                this.formItem.movieGenreMappingString = this.formItemToCopy.genreIds.join(',')
                this.formItem.plot = this.formItemToCopy.plot
                this.formItem.year = parseInt(this.formItemToCopy.year)
                this.formItem.coverImage = this.getImage(this.file)
            },

            getImage(file){
                let formData=new FormData();
                let image=file;
                formData.append("file",image,image.name);
                return formData
            },

            handleUpload (file) {
                console.log("handleUpload",file)
                this.file = file;
            }

        },
        created(){
            this.getGenresAsync()
            if (this.isEdit){
                this.formItemToCopy.name = this.movie.name
                this.formItemToCopy.producerId = this.movie.producerId
                this.formItemToCopy.genreIds = this.movie.genres.map(x => x.id)
                this.formItemToCopy.actorIds = this.movie.actors.map(x => x.id)
                this.formItemToCopy.plot = this.movie.plot
                this.formItemToCopy.year = this.movie.year
           
            }
        }

}
</script>