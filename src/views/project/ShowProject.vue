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
            <div class="card">
                <div class="card-header"><span>{{ project.name }}</span>
                    <b-button class="float-right">
                        <font-awesome-icon icon="edit"/>
                    </b-button>
                </div>
                <div class="card-body">{{ project.purpose }}</div>
                <div class="card-footer">
                    <b-link to="" class="float-right">Перейти</b-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable no-console */

    import {faSearch, faEdit} from '@fortawesome/free-solid-svg-icons'

    export default {
        name: "Projects",
        data() {
            return {
                projects: [],
            }
        },
        created() {
            this.$fontAwesome.add(faSearch, faEdit);
            this.$http.get('users/' + this.$store.getters['auth/getUser'].id + '/projects').then((response) => {
                this.projects = response.data.data;
                console.log(this.projects)
            });
        }
    }
</script>

<style scoped>

</style>