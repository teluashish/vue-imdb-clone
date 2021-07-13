<template>
    <div id="formModal">
        <Button type="primary" ghost @click="personModal = true">+ Add {{isActor ? 'Actor' : 'Producer'}}</Button>
        <Modal v-model="personModal" width="600">
            <p slot="header" style="text-align:center">
                <span>Fill Details</span>
            </p>
            <div style="text-align:center">
                <Form :model="formItem" :label-width="120" ref="formItem" >
                    <FormItem label="Name" prop="name">
                       <Input v-model="formItem.name" placeholder="Enter Name"></Input>
                    </FormItem>

                    <FormItem label="Date of birth" prop="dob">
                        <Row>
                            <Col span="11">
                                <DatePicker type="date" placeholder="Select date" v-model="formItem.dob"></DatePicker>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem label="Gender" prop="gender">
                        <RadioGroup v-model="formItem.gender">
                            <Radio label="male">Male</Radio>
                            <Radio label="female">Female</Radio>
                        </RadioGroup>
                    </FormItem>


                    <FormItem label="Bio" prop="bio">
                       <Input v-model="formItem.bio" type="textarea" :autosize="{minRows: 1,maxRows: 5}" placeholder="Enter bio..."></Input>
                    </FormItem>


                </Form>
            </div>

            <div slot="footer">
                <Button type="primary" @click="handleSubmit()">Submit</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Schema from 'async-validator'

const descriptor = {
    formItem:{
        type: 'object',
        required: true,
        fields:{
            name: [ {required:true, type: 'string', pattern: new RegExp(/^[a-z ,.'-]+$/i), message:'Invalid full name'}],

            bio: [ { required: true, message: 'Please enter a Personal Introduction'},
                   {type: 'string', min: 10, message: 'Number of characters cannot be less than 10'},
                   {type: 'string', max: 500, message: 'Limit the number of characters to 500'} ],

            gender: {type: 'string', required: 'true', message: 'Please choose a gender'},

            dob: {
                required: true,
                type: 'date', 
                // eslint-disable-next-line no-unused-vars
                validator(rule, value, callback, source, options){
                    return Math.floor((new Date() - new Date(value).getTime()) / 3.15576e+10) > 18

                },
                message: 'Please choose a valid date of birth'
            }

        }
    }    
}

const validator = new Schema(descriptor)




export default {

        props:['isActor'],
        data(){
            return {
                personModal: false,
                formItem: {
                    name: '',
                    bio: '',
                    dob:null,
                    gender: ''
                }
            }
        },

        methods: {
            ...mapActions(['postActorAsync','postProducerAsync','getActorsAsync','getProducersAsync']),
            submit () {
                this.personModal = false
                this.add()
            },
            getAge (dob){
               return Math.floor((new Date() - new Date(dob).getTime()) / 3.15576e+10)
            },


           async add(){
                if (this.isActor){
                    await this.postActorAsync(this.formItem)
                    await this.getActorsAsync()
                }
                else { 
                    await this.postProducerAsync(this.formItem)
                    await this.getProducersAsync()
                }
                this.makeEmpty()
            },

            makeEmpty(){
                this.formItem.name = ''
                this.formItem.bio = ''
                this.formItem.dob = null
                this.formItem.gender = ''
            },

            handleSubmit () {
                validator.validate({formItem: this.formItem})
                    .then(() => this.submit())
                    .catch((errors,fields) => {
                        console.log(errors,fields)
                        })
            }

        }
        
}

</script>
