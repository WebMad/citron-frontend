<template>
    <div class="row">
        <Menu :id="id"/>
        <div class="col-sm-12 mb-3">
            <div class="card">
                <div class="card-body p-1">
                    <b-button class="float-right" to="tasks/create">
                        <font-awesome-icon icon="plus"/> добавить карточку
                    </b-button>
                </div>
            </div>
        </div>
        <div v-for="(task_stage, index) in task_stages" :key="task_stage.id" class="col-sm-4" :edit="false">
            <div class="card mb-3">
                <div class="card-header">
                    <template v-if="edit === task_stage.id">
                        <b-form-input
                          :state="$v.name.required && $v.name.maxLength"
                          aria-describedby="invalid_input_name"
                          placeholder="Введите новое название проекта"
                          class="mb-1"
                          :value="task_stage.name"
                          @input="edit_name = $event"
                        />
                        <b-button class="float-right ml-1" @click="closeEdit">
                            <font-awesome-icon icon="times"/>
                        </b-button>
                        <b-button class="float-right bg-success ml-1" @click="editStage(task_stage.id)">
                            <font-awesome-icon icon="check"/>
                        </b-button>
                    </template>
                    <template v-else>{{ task_stage.name }}
                        <b-button class="float-right bg-danger ml-1" @click="deleteStage(task_stage.id)">
                            <font-awesome-icon icon="trash"/>
                        </b-button>
                        <b-button class="float-right" @click="edit = task_stage.id">
                            <font-awesome-icon icon="edit"/>
                        </b-button>
                     </template>
                </div>
                <div class="card-body">
                    <p>Позиция: {{ task_stage.position }}</p>
                    <draggable group="tasks" v-model="task_stages[index].tasks" :data-stage-id="task_stage.id" class="list-group" :move="movedTaskStage">
                        <div v-for="task in task_stage.tasks" v-bind:key="task.id" class="col-sm-12 pl-0 pr-0 mb-1">
                            <div class="card">
                                <div class="card-body">
                                    <b-link :to="'tasks/' + task.id"><h4>{{ task.name }}</h4></b-link>
                                    <p>Статус: {{ task.status.name }}</p>
                                </div>
                            </div>
                        </div>
                    </draggable>
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="card">
                <div class="card-header">
                    Создать доску
                </div>
                <div class="card-body">
                    <form
                            action=""
                            @submit.prevent="createTaskStage"
                    >
                        <b-form-group
                                label-cols-sm="4"
                                label-cols-lg="3"
                                label="Название"
                        >
                            <b-input-group>
                                <b-form-input
                                        v-model.trim="name"
                                        :state="$v.name.required && $v.name.maxLength"
                                        aria-describedby="invalid_input_name"
                                        placeholder="Введите название проекта"/>
                                <b-form-invalid-feedback v-if="!$v.name.required" id="invalid_input_name">
                                    Поле имя обязательно для заполнения
                                </b-form-invalid-feedback>
                                <b-form-invalid-feedback v-if="!$v.name.maxLength" id="invalid_input_name">
                                    Длина поля Имя не должна превышать 255 символов
                                </b-form-invalid-feedback>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group
                                label-cols-sm="4"
                                label-cols-lg="3"
                                label="Позиция карточки"
                        >
                            <b-input-group>
                                <b-form-input
                                        v-model.trim="position"
                                        :state="$v.position.required && $v.position.numeric && $v.position.maxLength"
                                        aria-describedby="invalid_input_name"
                                        placeholder="Введите номер этапа"/>
                                <b-form-invalid-feedback v-if="!$v.position.required" id="invalid_input_name">
                                    Поле обязательно для заполнения
                                </b-form-invalid-feedback>
                                <b-form-invalid-feedback v-if="!$v.position.numeric" id="invalid_input_name">
                                    Поле должно содержать число
                                </b-form-invalid-feedback>
                                <b-form-invalid-feedback v-if="!$v.position.minValue" id="invalid_input_name">
                                    Значение не должны быть меньше 1
                                </b-form-invalid-feedback>
                            </b-input-group>
                        </b-form-group>
                        <b-button variant="primary" class="float-right" type="submit">
                            Создать
                        </b-button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Menu from "@/components/project/Menu";
    import {required, maxLength, numeric, minValue} from 'vuelidate/lib/validators'
    import {faPlus, faEdit, faTrash, faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
    import draggable from 'vuedraggable';

    export default {
        name: "Kanban",
        props: [
            'id'
        ],
        components: {
            Menu,
            draggable
        },
        validations: {
            name: {
                required,
                maxLength: maxLength(255),
            },
            position: {
                required,
                numeric,
                minValue: minValue(1)
            },
            task_name: {
                required,
                maxLength: maxLength(255)
            },
            implementer_id: {
                required,
                numeric
            },
            prospective_date: {
                required
            },
            status_id: {
                required,
                numeric
            }
        },
        data() {
            return {
                task_stages: [],
                name: "",
                edit: null,
                edit_name: null,
                position: 1,
                list: [],
            }
        },
        created() {
            this.$fontAwesome.add(faPlus, faEdit, faTrash, faCheck, faTimes);
            this.getTaskStages();
        },
        methods: {
            getTaskStages() {
                this.$http.get('projects/' + this.id + '/kanban').then((response) => {
                    this.task_stages = response.data;
                    this.task_stages.forEach(val => {
                        this.list[val.id] = val.tasks;
                    });
                });
            },
            movedTaskStage(e){
                if (e.to.dataset.stageId) {
                    this.$http.put('project_tasks/' + e.draggedContext.element.id, {
                        stage_id: e.to.dataset.stageId,
                    });
                }
            },
            createTaskStage() {
                this.$http.post('project_task_stages', {
                    name: this.name,
                    position: this.position,
                    project_id: this.id
                }).then(() => {
                    this.getTaskStages()
                });
            },
            deleteStage(id){
                this.$http.delete(`/project_task_stages/${id}`).then(() => {
                    this.getTaskStages()
                })
            },
            closeEdit(){
              this.edit_name = null
              this.edit = null
            },
            editStage(id) {
                this.$http.put(`/project_task_stages/${id}`, {
                    name: this.edit_name
                }).then(() => {
                    this.closeEdit()
                    this.getTaskStages()
                })
            }
        }
    }
</script>

<style scoped>

</style>