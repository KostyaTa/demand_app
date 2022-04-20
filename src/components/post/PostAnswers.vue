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
        </div>
</template>
<script>
    import axios from 'axios'
export default {
    props: {
        postId: String
    },
    data() {
        return {
            answersList: null,
            user: null
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
                .catch(({response}) => {
                    console.log('error: ' + response)
                })
            }
        },
        dateTime: function(value) {
            let date = new Date(value)
            return date.getFullYear()+'-'+ ((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1) + (date.getDate() > 9 ? '' : '0') +'-'+ date.getDate()
        }
    }
}
</script>
<style lang="">
    
</style>