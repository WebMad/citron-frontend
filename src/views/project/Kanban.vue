<template>
    <div class="row">
        <Menu :id="id"/>
        <div v-for="task_stage in task_stages" v-bind:key="task_stage.id" class="col-sm-4">
            <div class="card">
                <div class="card-header">
                    {{ task_stage.name }}
                    <b-button class="float-right">
                        <font-awesome-icon icon="plus"/>
                    </b-button>
                </div>
                <div class="card-body">
                    <div v-for="task in task_stage.tasks" v-bind:key="task.id" class="col-sm-4">
                        <div class="card">
                            <div class="card-body">
                                <h4>{{ task.name }}</h4>
                                <p>Статус: {{ task.status.name }}</p>
                            </div>
                        </div>
                    </div>
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
        <b-modal id="create-invite-modal" title="Создание приглашения">
            <form action="" @submit.prevent="addTask">
                <b-form-group
                        label-cols-sm="4"
                        label-cols-lg="3"
                        label="E-mail"
                >
                    <b-input-group>
                        <b-form-input
                                v-model.trim="email"
                                :state="$v.email.required && $v.email.maxLength && $v.email.email"
                                aria-describedby="invalid_input_name"
                                placeholder="Введите email пользователя"/>
                        <b-form-invalid-feedback v-if="!$v.email.required" id="invalid_input_name">
                            Поле обязательно для заполнения
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback v-if="!$v.email.email" id="invalid_input_name">
                            Поля должно быть в формате email адреса
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback v-if="!$v.email.maxLength" id="invalid_input_name">
                            Длина поля не должна превышать 255 символов
                        </b-form-invalid-feedback>
                    </b-input-group>
                </b-form-group>
                <b-form-group>
                    <b-form-select v-model="selected_task_status" :options="this.task_statuses"></b-form-select>
                </b-form-group>
            </form>
            <template v-slot:modal-footer>
                <b-button @click="hideInviteModal" variant="outline-secondary">Отмена</b-button>
                <b-button variant="primary" @click="isEdit ? editInvite() : addMember()">Сохранить</b-button>
            </template>

        </b-modal>
    </div>
</template>

<script>
    import Menu from "@/components/project/Menu";
    import {required, maxLength, numeric, minValue} from 'vuelidate/lib/validators'
    import {faPlus} from "@fortawesome/free-solid-svg-icons";

    export default {
        name: "Kanban",
        props: [
            'id'
        ],
        components: {
            Menu
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
            }
        },
        data() {
            return {
                task_stages: [],
                name: "",
                position: 1,
            }
        },
        created() {
            this.$fontAwesome.add(faPlus);
            this.getTaskStages();
            this.$fontAwesome.add();
        },
        methods: {
            getTaskStages() {
                this.$http.get('projects/' + this.id + '/kanban').then((response) => {
                    this.task_stages = response.data;
                });
            },
            createTaskStage() {
                this.$http.post('project_task_stages', {
                    name: this.name,
                    position: this.position,
                    project_id: this.id
                }).then(() => {
                    this.getTaskStages()
                });
            }
        }
    }
</script>

<style scoped>

</style>