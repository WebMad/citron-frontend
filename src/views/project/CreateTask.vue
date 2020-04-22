<template>
    <div class="col-sm-12">
        <div class="card">
            <div class="card-body">
                <form action="" @submit.prevent="addTask">
                    <b-form-group
                            label-cols-sm="4"
                            label-cols-lg="3"
                            label="Название"
                    >
                        <b-input-group>
                            <b-form-input
                                    v-model.trim="task_name"
                                    :state="$v.task_name.required && $v.task_name.maxLength"
                                    aria-describedby="invalid_input_name"
                                    placeholder="Введите название задачи"/>
                            <b-form-invalid-feedback v-if="!$v.task_name.required" id="invalid_input_name">
                                Поле обязательно для заполнения
                            </b-form-invalid-feedback>
                            <b-form-invalid-feedback v-if="!$v.task_name.maxLength" id="invalid_input_name">
                                Длина поля не должна превышать 255 символов
                            </b-form-invalid-feedback>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group
                            label-cols-sm="4"
                            label-cols-lg="3"
                            label="Описание задачи"
                    >
                        <b-input-group>
                            <b-form-textarea v-model="description" placeholder="Описание задачи"/>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group
                            label-cols-sm="4"
                            label-cols-lg="3"
                            label="Дата окончания"
                    >
                        <b-input-group>
                            <b-form-input
                                    type="date"
                                    v-model.trim="prospective_date"
                                    placeholder="Введите дату окончания"
                                    :state="$v.prospective_date.required"
                                    aria-describedby="invalid_input_end_date"
                            />
                            <b-input-group-append>
                                <b-input-group-text>
                                    <font-awesome-icon icon="calendar-alt"/>
                                </b-input-group-text>
                            </b-input-group-append>
                            <b-form-invalid-feedback id="invalid_input_end_date">Поле обязательно для заполнения
                            </b-form-invalid-feedback>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group>
                        <b-form-select v-model="status_id" :options="this.task_statuses" value-field="id" text-field="name">
                            <template v-slot:first>
                                <option :value="null">Выберите статус карточки</option>
                            </template>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group>
                        <b-form-select v-model="task_stage_id" :options="this.task_stages" value-field="id" text-field="name">
                            <template v-slot:first>
                                <option :value="null">Выберите доску для карточки</option>
                            </template>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group>
                        <b-form-select v-model="implementer_id" :options="this.implementers" value-field="id" text-field="name">
                            <template v-slot:first>
                                <option :value="null">Выберите исполнителя</option>
                            </template>
                        </b-form-select>
                    </b-form-group>
                    <b-button variant="primary" class="float-right" type="submit">{{ (is_edit) ? 'Создать' : 'Сохранить' }}</b-button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {maxLength, numeric, required} from "vuelidate/lib/validators";
    import {mapGetters} from "vuex";

    export default {
        name: "CreateTask",
        validations: {
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
        computed: {
            ...mapGetters('auth', ['getUser'])
        },
        data() {
            return {
                task_name: "",
                description: "",
                implementer_id: null,
                prospective_date: "",
                status_id: null,
                task_statuses: [],
                implementers: [],
                task_stage_id: null,
                task_stages: [],
                is_edit: false,
            }
        },
        props: [
            'project_id',
            'task_id'
        ],
        created() {
            this.$http.get('project_task_statuses').then(response => {
                this.task_statuses = response.data;
            });
            this.$http.get('projects/' + this.project_id + '/task_stages').then(response => {
                this.task_stages = response.data;
            });
            this.$http.get('projects/' + this.project_id + '/users').then(response => {
                response.data.data.forEach((val) => {
                    this.implementers.push({
                        id: val.user.id,
                        name: val.user.name,
                    })
                });
            });
            if (this.task_id) {
                this.$http.get('project_tasks/' + this.task_id).then(response => {
                    this.implementer_id = response.data.implementer_id;
                    this.creator_id = response.data.creator_id;
                    this.task_name = response.data.name;
                    this.description = response.data.description;
                    this.prospective_date = this.formatDate(response.data.prospective_date);
                    this.status_id = response.data.status_id;
                    this.task_stage_id = response.data.stage_id;
                    this.is_edit = true;
                });
            }
        },
        methods: {
            formatDate(date) {
                let start_date = new Date(date),
                    month = '' + (start_date.getMonth() + 1),
                    day = '' + start_date.getDate(),
                    year = start_date.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            },
            addTask() {
                if (this.is_edit) {
                    this.$http.put('project_tasks/' + this.task_id, {
                        name: this.task_name,
                        description: this.description,
                        implementer_id: this.implementer_id,
                        creator_id: this.getUser.id,
                        prospective_date: this.prospective_date,
                        status_id: this.status_id,
                        project_id: this.project_id,
                        stage_id: this.task_stage_id,
                    }).then(() => {
                        this.$router.back();
                    });
                } else {
                    this.$http.post('project_tasks', {
                        name: this.task_name,
                        description: this.description,
                        implementer_id: this.implementer_id,
                        creator_id: this.getUser.id,
                        prospective_date: this.prospective_date,
                        status_id: this.status_id,
                        project_id: this.project_id,
                        stage_id: this.task_stage_id,
                    }).then(() => {
                        this.$router.back();
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>