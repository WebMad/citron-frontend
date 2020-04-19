<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-body row">
                    <div class="col-sm-10">
                        <b-input-group>
                            <b-form-input class="flex-grow" placeholder="Search project"/>
                            <b-input-group-append>
                                <b-button variant="secondary">
                                    <font-awesome-icon icon="search"/>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </div>
                    <div class="col-sm-2">
                        <b-button class="float-right w-100" to="/projects/create" variant="success">New project
                        </b-button>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="project in projects" class="project-list col-md-4 mt-2" v-bind:key="project.id">
            <ProjectCard v-on:update-projects-list="updateProjectsList" :project="project"/>
        </div>
    </div>
</template>

<script>
    /* eslint-disable no-console */

    import {faSearch, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
    import ProjectCard from "@/components/project/ProjectCard";
    import {mapGetters} from "vuex";

    export default {
        name: "Projects",
        components: {
            ProjectCard,
        },
        computed: {
            ...mapGetters('auth', ['getUser'])
        },
        methods: {
            async updateProjectsList() {
                this.$http.get('users/' + this.getUser.id + '/projects').then((response) => {
                    this.projects = response.data.data;
                });
            }
        },
        data() {
            return {
                projects: [],
            }
        },
        created() {
            this.$fontAwesome.add(faSearch, faEdit, faTrash);
            this.updateProjectsList();
        }
    }
</script>

<style scoped>

</style>