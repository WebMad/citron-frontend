<template>
    <b-card v-if="comment_params.user" body-class="p-3" class="mt-3" :title="getNameAndSurname(comment_params.user)"
            :sub-title="comment_params.created_at">

        <b-card-text v-if="!is_edit" class="mb-0">
            {{ comment_params.text }}
        </b-card-text>
        <b-card-text v-else class="mb-0">
            <form action="" @submit.prevent="editComment">
                <b-form-textarea v-model="edit_text" placeholder="Введите комментарий"/>
                <b-button variant="success" class="mt-2 float-right" type="submit">
                    Сохранить
                </b-button>
            </form>
        </b-card-text>
        <b-card-text class="mb-0 float-left" style="cursor: pointer; color: #007bff" @click="showForm = !showForm">
            Ответить
        </b-card-text>
        <span v-if="comment_params.can_delete" class="mb-0 ml-3" style="cursor: pointer; color: #007bff" @click="deleteComment">Удалить</span>
        <span v-if="comment_params.can_edit" class="mb-0 ml-3" style="cursor: pointer; color: #007bff" @click="showEditComment">Редактировать</span>
        <AddComment v-if="showForm" class="mt-3" :feed_id="feed_id" :reply_id="comment_params.id"
                    :callback="updateComment"/>
        <Comment v-for="comment_data in comment_params.comments_tree" :comment="comment_data" :feed_id="feed_id"
                 :key="comment_data.id"/>
    </b-card>
</template>

<script>
    import AddComment from "./AddComment";

    export default {
        name: "Comment",
        components: {AddComment},
        props: {
            comment_id: Number,
            comment: Object,
            feed_id: Number
        },
        data() {
            return {
                showForm: false,
                comment_params: {},
                is_edit: false,
                edit_text: "",
            };
        },
        created() {
            if (!this.comment) {
                this.updateComment();
            } else {
                this.comment_params = this.comment;
            }
        },
        methods: {
            getNameAndSurname(user) {
                let result = "";
                if (user.surname) {
                    result += user.surname;
                }
                if (user.name) {
                    result += " " + user.name;
                }
                return result;
            },
            updateComment() {
                let comment_id = (this.comment_id) ? this.comment_id : this.comment.id;
                this.$http.get('comments/' + comment_id).then(response => {
                    this.comment_params = response.data.data;
                });
            },
            deleteComment() {
                this.$http.delete('comments/' + this.comment_params.id).then(() => {
                    this.comment_params = {};
                });
            },
            showEditComment() {
                this.edit_text = this.comment_params.text;
                this.is_edit = !this.is_edit
            },
            editComment() {
                this.$http.put('comments/' + this.comment_params.id, {
                    text: this.edit_text,
                }).then(() => {
                    this.is_edit = false;
                    this.edit_text = "";
                    this.updateComment();
                });
            }
        },
    }
</script>

<style scoped>

</style>