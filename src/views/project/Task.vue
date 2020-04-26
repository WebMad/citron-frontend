<template>
    <div class="col-sm-12">
        <div class="card">
            <div class="card-body">
                <b-button class="float-right btn-danger ml-2" @click="deleteTask(task_id)">
                    <font-awesome-icon icon="trash"/>
                </b-button>
                <b-button :to="task_id + '/edit'" class="float-right">
                    <font-awesome-icon icon="edit"/>
                </b-button>
                <h3>{{ task_name }}</h3>

                <p>{{ description }}</p>

                <p>
                    <b>Статус: </b>
                    <span v-if="!!status">{{ status }}</span>
                    <span v-else>Не определен</span>
                </p>
                <p>
                    <b>Исполнитель: </b>
                    <span v-if="!!implementer">{{ implementer.name }}</span>
                    <span v-else>Не определен</span>
                </p>
                <p>
                    <b>Создатель: </b>
                    <span v-if="!!creator">{{ `${creator.name}` }}</span>
                    <span v-else>Не определен</span>
                </p>
            </div>
        </div>

        <h3 class="mt-3">Обсуждение</h3>
        <Feed v-if="feed_id" :feed_id="feed_id"/>
    </div>
</template>

<script>
    import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
    import Feed from "../../components/feed/Feed";

    export default {
        name: "Task",
        components: {Feed},
        props: [
            'task_id'
        ],
        data() {
            return {
                task_name: "",
                description: "",
                status: "",
                prospective_date: "",
                implementer: null,
                creator: null,
                stage: null,
                feed_id: null,
            }
        },
        created() {
            this.$fontAwesome.add(faEdit, faTrash);
            this.$http.get('project_tasks/' + this.task_id).then(response => {
                this.task_name = response.data.name;
                this.description = response.data.description;
                this.prospective_date = response.data.prospective_date;
                this.implementer = response.data.implementer;
                this.creator = response.data.creator;
                this.status = response.data.status.name;
                this.stage = response.data.stage;
                this.feed_id = response.data.feed_id;
            });
        },
        methods: {
            deleteTask(id){
                this.$http.delete(`/project_tasks/${id}`).then(() => {
                    this.$router.back()
                })
            }
        }
    }
</script>

<style scoped>

</style>