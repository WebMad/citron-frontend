<template>
    <div class="row">
        <Menu :id="project_id"/>
        <div class="col-sm-12">
<!--            <Task task_id="" />-->
        </div>
    </div>
</template>

<script>
    import Menu from "../../components/project/Menu";
    // import Task from "./Task";

    export default {
        name: "TasksList",
        components: {Menu},
        props: [
            'project_id'
        ]
    }
</script>

<style scoped>

</style>