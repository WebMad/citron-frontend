<template>
    <b-jumbotron :header="`Привет, ${getUser.name}`" lead="">
        <p>Работа в больших проектах часто затрудняется невозможностью организации рабочих процессов на удаленной
            основе, что особенно актуально для инициативы "Кадры будущего для регионов". Мы решаем эту проблему путем
            создания данной системы.</p>
        <b-button variant="primary" href="#">Продащая кнопка</b-button>
    </b-jumbotron>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Main",
        props: {},
        computed: {
            ...mapGetters('auth', ["getUser"])
        }
    }
</script>

<style scoped>
</style>