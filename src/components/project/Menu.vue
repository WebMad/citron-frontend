<template>
    <div class="col-sm-12 mb-3">
        <div class="card">
            <div class="card-body">
                <b-button :to="'/projects/' + id" variant="primary">Главная</b-button>
                <b-button class="ml-3" :to="'/projects/' + id + '/kanban'" variant="primary">Доска</b-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Menu",
        props: [
            'id'
        ],
    }
</script>

<style scoped>

</style>