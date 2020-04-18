<template>
    <header class="header">
        <div class="header-menu row">
            <div class="col-sm-7">{{ $route.name }}</div>
            <div class="col-sm-5">
                <b-dropdown right class="user-area float-right">
                    <template v-slot:button-content>
                        {{ getUser.name }}
                    </template>
                    <b-dropdown-item>My Profile</b-dropdown-item>
                    <b-dropdown-item to="/projects">My projects
                        <b-badge pill variant="secondary" v-if="notifications.length">{{notifications.length}}</b-badge>
                    </b-dropdown-item>
                    <b-dropdown-item>Settings</b-dropdown-item>
                    <b-dropdown-item to="/logout">Logout</b-dropdown-item>
                </b-dropdown>
            </div>
        </div>
    </header>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "navbar",
        data() {
            return {
                notifications: []
            }
        },
        computed: {
            ...mapGetters("auth", ["getUser"])
        },
        created() {
            this.$http.get(`/users/${this.getUser.id}/invites`).then((response) => {
                this.notification = response.data
            })
        }
    }
</script>

<style scoped>

</style>