<template>
        <div class="answers-wrap container" v-if="answersList">
            <h2>Answers</h2>
            <ul class="answers list-group">
                <li class="answer-item list-group-item" v-for="answer in answersList" :key="answer">
                    <div class="row">
                        <span class="col-auto"><b>{{answer.user.username}}</b></span>
                        <span class="col-auto">{{dateTime(answer.created_at)}}</span>
                    </div>
                    <div><p>{{answer.text}}</p></div>
                </li>
            </ul>
            <div>
                <a href="" class="btn btn-primary" @click.prevent="addNew = !addNew" v-if="!addNew"> Add Answer</a>
            </div>
            <div class="new-answers-wrap container row" v-if="addNew">
                <h3>Add Answer</h3>
                <textarea name="" id="" v-model="newAnswer"></textarea>
                <div><p><b>{{answerMessage}}</b></p></div>
                <div class="d-flex justify-content-center btn-wrap">
                    <button class="btn btn-primary" @click="createAnswer">Cerate</button> 
                     <a href="" class="btn btn-outline-dark" @click.prevent="closeNewAnswer"> Close</a>
                </div>
                
            </div>
        </div>
</template>
<script>
    import axios from 'axios'
    import Cookies from 'js-cookie'
export default {
    props: {
        postId: String
    },
    data() {
        return {
            answersList: null,
            user: null,
            newAnswer: null,
            addNew: false,
            answerMessage: null
        }
    },
    mounted() {
        this.getAnswers()
    },
    methods: {
        getAnswers: function() {
            if(this.postId) {
            let apiUrl = process.env.VUE_APP_API_DOMAIN + process.env.VUE_APP_API_POSTS_ANSWERS_URL+'/'+this.postId
                axios({
                    method: 'get',
                    url: apiUrl
                })
                .then((data) => {

                    this.answersList = data.data.data
                    console.log(data)

                })
                .catch(({message}) => {
                    console.log('error: ' + message)
                })
            }
        },
        dateTime: function(value) {
            let date = new Date(value)
            return date.getFullYear()+'-'+ ((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1) + (date.getDate() > 9 ? '' : '0') +'-'+ date.getDate()
        },
        createAnswer: function () {
            let token = Cookies.get('X-CSRF-TOKEN')

            let apiUrl = process.env.VUE_APP_API_DOMAIN +  process.env.VUE_APP_API_POSTS_ANSWERS_URL + '/' + this.postId

            let config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            if(!this.newAnswer) {
                this.answerMessage = 'Answer can not be empty'
                return 
            }
            let data = {
                text: this.newAnswer
            }
            

            axios.post(apiUrl, data,  config)

            .then(({data}) => {
                    this.answerMessage = 'Answer add'

                    this.getAnswers()

                    setTimeout(() => {
                        this.closeNewAnswer()
                    }, 1500);
            })
            .catch(({message}) => {

                this.answerMessage = 'error: ' + message
            })
        },
        closeNewAnswer: function () {
            this.addNew = false
            this.answerMessage = null
            this.newAnswer = null
        }
    }
}
</script>
<style lang="">
    
</style>