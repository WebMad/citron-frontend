<template>
    <div class="row">
        <Menu :id="id"/>
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    Основная информация
                    <b-button :v-if="this.project.can_edit" @click="$router.push('/projects/edit/' + id)" class="float-right">
                        <font-awesome-icon icon="edit"/>
                    </b-button>
                </div>
                <div class="card-body">
                    <h3>{{ this.project.name}}</h3>
                    <p>Цель: {{ this.project.purpose ? this.project.purpose : 'Нет данных' }}</p>
                    <p>Ожидаемый результат: {{ this.project.expected_result ? this.project.expected_result : 'Нет данных' }}</p>
                    <p>Дата начала: {{ this.project.start_date ? this.project.start_date : 'Нет данных' }}</p>
                    <p>Дата окончания: {{ this.project.end_date ? this.project.end_date : 'Нет данных' }}</p>
                    <p>Ожидаемая дата окончания проекта: {{ this.project.expected_date ? this.project.expected_date : 'Нет данных' }}</p>
                </div>
            </div>
        </div>
        <Stages :id="id" />
        <Resources :id="id" />
        <Members :id="id" />
    </div>
</template>

<script>
    import Stages from '@/components/project/Stages.vue';
    import Resources from '@/components/project/Resources.vue';
    import Members from '@/components/project/Members.vue';
    import Menu from "../../components/project/Menu";

    export default {
        name: "Project",
        props: [
            'id'
        ],
        data() {
            return {
                project: {},
                resources: [],
                users: [],
            }
        },
        components: {
            Menu,
            Members,
            Stages,
            Resources,
        },
        created() {
            this.$http.get('projects/' + this.id + '/fullInfo').then((response) => {
                let data = response.data.data;
                this.project = data.project;
                this.resources = data.resources;
                data.users.forEach(value => {
                    let user = value.user;
                    user.role = value.project_role.name;
                    this.users.push(user);
                });
            });
        }
    }
</script>

<style scoped>

</style>