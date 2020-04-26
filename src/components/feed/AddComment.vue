<template>
    <div class="card">
        <div class="card-body">
            <form action="" @submit.prevent="addComment">
                <b-form-textarea v-model="text" placeholder="Введите комментарий"/>
                <b-button variant="success" class="mt-2 float-right" type="submit">
                    Ответить
                </b-button>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "AddComment",
        props: [
            'feed_id',
            'callback',
            'reply_id',
        ],
        computed: {
            ...mapGetters('auth', ['getUser']),
        },
        data() {
            return {
                text: "",
            };
        },
        methods: {
            addComment() {
                let comment_data = {
                    text: this.text,
                    user_id: this.getUser.id,
                    feed_id: this.feed_id,
                    reply_id: this.reply_id,
                };
                this.$http.post('comments', comment_data).then(() => {
                    this.text = "";
                    this.callback();
                });
            },
        }
    }
</script>

<style scoped>

</style>