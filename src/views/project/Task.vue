<template>
    <div class="col-sm-12">
        <div class="card">
            <div class="card-body">
                <b-button :to="task_id + '/edit'" class="float-right">
                    <font-awesome-icon icon="edit"/>
                </b-button>
                <h3>{{ task_name }}</h3>
                <b-button class="float-right bg-danger" @click="deleteTask(task_id)">
                    <font-awesome-icon icon="trash"/>
                </b-button>
                <p>{{ description }}</p>
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
    </div>
</template>

<script>
    import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";

    export default {
        name: "Task",
        props: [
            'task_id'
        ],
        data() {
            return {
                task_name: "",
                description: "",
                prospective_date: "",
                implementer: null,
                creator: null,
                stage: null,
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
                this.stage = response.data.stage;
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