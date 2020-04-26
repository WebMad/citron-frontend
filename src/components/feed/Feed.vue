<template>
    <div v-if="feed">
        <Comment v-for="comment in feed.comments" :comment="comment" :feed_id="feed_id" :key="comment.id"/>

        <AddComment class="mt-3" :feed_id="feed_id" :callback="updateFeed"/>
    </div>
</template>

<script>

    import AddComment from "./AddComment";
    import Comment from "./Comment";

    export default {
        name: "Feed",
        components: {
            AddComment,
            Comment
        },
        props: [
            'feed_id'
        ],
        data() {
            return {
                feed: null,
            };
        },
        created() {
            this.updateFeed();
        },
        methods: {
            updateFeed() {
                this.$http.get('feeds/' + this.feed_id).then(feed_response => {
                    this.feed = feed_response.data.data;
                });
            }
        }
    }
</script>

<style scoped>

</style>