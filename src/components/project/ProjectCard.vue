<template>
    <div class="card">
        <div class="card-header"><span>{{ project.name }}</span>
        </div>
        <div class="card-body">{{ project.purpose }}</div>
        <div class="card-footer">
            <b-button @click="edit" class="float-left">
                <font-awesome-icon icon="edit"/>
            </b-button>
            <b-button @click="del" variant="danger" class="float-left ml-2">
                <font-awesome-icon icon="trash"/>
            </b-button>
            <b-link :to="'/projects/' + project.id" class="float-right">Перейти</b-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProjectCard",
        props: [
            'project'
        ],
        methods: {
            del() {
                this.$http.delete('projects/' + this.project.id);
                this.$emit('update-projects-list')
            },
            edit() {
                this.$router.push('/projects/edit/' + this.project.id);
            },
            openProject() {

            }
        }
    }
</script>

<style scoped>

</style>