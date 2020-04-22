<template>
    <header class="header">
        <div class="header-menu row">
            <div class="col-9">
                <b-dropdown>
                    <template v-slot:button-content>
                        <font-awesome-icon icon="bell"/>
                        <b-badge style="margin-left: 5px" variant="light">{{ invites.length }}</b-badge>
                    </template>
                    <template v-slot:default>
                        <b-alert style="width: 400px" :key="invite.id" v-for="invite in invites" :show="true"
                                 variant="success">
                            Вас приглашают в проект
                            <b>"{{ invite.project.name }}"</b>
                            <p align="right">
                                <b-btn-group>
                                    <b-btn @click="denyInvite(invite.id)" variant="danger">Отклонить</b-btn>
                                    <b-btn @click="acceptInvite(invite.id)" variant="success">Принять</b-btn>
                                </b-btn-group>
                            </p>
                        </b-alert>
                        <p v-if="invites" align="center">Нет уведомлений</p>
                    </template>
                </b-dropdown>
                <b-dropdown class="ml-1">
                    <template v-slot:button-content>
                        <font-awesome-icon icon="envelope"/>
                        <b-badge style="margin-left: 5px" variant="light">0</b-badge>
                    </template>
                    <template v-slot:default>
                        <p align="center">Нет сообщений</p>
                    </template>
                </b-dropdown>
            </div>
            <div class="col-3">
                <b-dropdown variant="primary" right class="user-area float-right">
                    <template v-slot:button-content>
                        {{ getUser.name }}
                    </template>
                    <!--                            <b-dropdown-item>My Profile</b-dropdown-item>-->
                    <b-dropdown-item to="/projects">My projects
                        <!--                                <b-badge pill variant="secondary">13</b-badge>-->
                    </b-dropdown-item>
                    <!--                            <b-dropdown-item>Settings</b-dropdown-item>-->
                    <b-dropdown-item to="/logout">Logout</b-dropdown-item>
                </b-dropdown>
            </div>
        </div>
    </header>
</template>

<script>
    import {mapGetters} from "vuex";
    import {
        faPuzzlePiece,
        faLaptop,
        faTachometerAlt,
        faBell,
        faEnvelope,
        faBars
    } from '@fortawesome/free-solid-svg-icons'

    export default {
        name: "navbar",
        data() {
            return {
                breadcrumb: '',
                invites: [],
            }
        },
        computed: {
            ...mapGetters("auth", ["getUser"])
        },
        created() {
            this.$fontAwesome.add(faPuzzlePiece, faLaptop, faTachometerAlt, faBell, faEnvelope, faBars);
            this.checkInvites()
        },
        methods: {
            checkInvites() {
                this.$http.get('users/' + this.getUser.id + '/invites').then((response) => {
                    this.invites = response.data.data;
                });
            },
            acceptInvite(id) {
                this.$http.post('project_invites/' + id + '/accept').then(() => {
                    this.checkInvites();
                });
            },
            denyInvite(id) {
                this.$http.post('project_invites/' + id + '/deny').then(() => {
                    this.checkInvites();
                });
            },
        }
    }
</script>

<style scoped>

</style>