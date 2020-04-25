<template>
    <div class="row">
        <b-card no-body class="overflow-hidden m-auto p-2" style="max-width: 55rem;">
            <b-row no-gutters align-v="center">
                <b-col md="3">
                    <b-card-img :src="require('@/assets/avataaars.svg')" alt="Image" height="200"
                                class="rounded-0"></b-card-img>
                </b-col>
                <b-col md="9">
                    <b-card-body :title="`${getUser.role.name} ${getUser.name}`">
                        <b-card-text>
                            <div class="row pl-3">
                                <b-list-group class="col-6">
                                    <b-list-group-item><span class="font-weight-bold">Email</span>: {{getUser.email}}
                                    </b-list-group-item>
                                </b-list-group>
                                <b-list-group class="col-6">
                                    <b-list-group-item><span class="font-weight-bold">Дата регистрации</span>:
                                        {{registrationDate}}
                                    </b-list-group-item>
                                </b-list-group>
                            </div>
                            <b-button class="btn-success col-4 offset-8 mt-3" to="/edit-profile">
                                Редактировать
                                <font-awesome-icon icon="edit"/>
                            </b-button>
                        </b-card-text>
                    </b-card-body>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {faEdit} from "@fortawesome/free-solid-svg-icons";

    export default {
        name: "Show",
        computed: {
            ...mapGetters("auth", ["getUser"]),
            registrationDate() {
                let D = new Date(this.getUser.created_at)
                return `${D.getDate()}-${D.getMonth()}-${D.getFullYear()}`
            }
        },
        created() {
            this.$fontAwesome.add(faEdit);
        }
    }
</script>

<style scoped>

</style>