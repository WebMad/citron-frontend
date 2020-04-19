<template>
    <div class="col-sm-12">
        <div class="card">
            <div class="card-body">
                <form
                        action=""
                        @submit.prevent="createProject"
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
                            label="Цель проекта"
                    >
                        <b-input-group>
                            <b-form-textarea
                                    v-model="purpose"
                                    placeholder="Введите цель проекта"
                            />
                        </b-input-group>
                    </b-form-group>
                    <b-form-group
                            label-cols-sm="4"
                            label-cols-lg="3"
                            label="Ожидаемый результат"
                    >
                        <b-input-group>
                            <b-form-textarea v-model="expected_result" placeholder="Что вы ждете от проекта?"/>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group
                            label-cols-sm="4"
                            label-cols-lg="3"
                            label="Дата начала"
                    >
                        <b-input-group>
                            <b-form-input
                                    type="date"
                                    v-model.trim="start_date"
                                    placeholder="Введите дату начала проекта"
                                    :state="$v.start_date.required"
                                    aria-describedby="invalid_input_start_date"
                            />
                            <b-input-group-append>
                                <b-input-group-text>
                                    <font-awesome-icon icon="calendar-alt"/>
                                </b-input-group-text>
                            </b-input-group-append>
                            <b-form-invalid-feedback id="invalid_input_start_date">Поле обязательно для заполнения
                            </b-form-invalid-feedback>
                        </b-input-group>

                    </b-form-group>
                    <b-form-group
                            label-cols-sm="4"
                            label-cols-lg="3"
                            label="Ожидаемая дата окончания проекта"
                    >
                        <b-input-group>
                            <b-form-input
                                    v-model="expected_date"
                                    type="date"
                                    :state="$v.expected_date.required"
                                    aria-describedby="invalid_input_expected_date"
                            />
                            <b-input-group-append>
                                <b-input-group-text>
                                    <font-awesome-icon icon="calendar-alt"/>
                                </b-input-group-text>
                            </b-input-group-append>
                            <b-form-invalid-feedback id="invalid_input_expected_date">Поле обязательно для
                                заполенения
                            </b-form-invalid-feedback>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group
                            v-if="!this.id"
                            label-cols-sm="4"
                            label-cols-lg="3"
                            label="Моя роль в проекте"
                    >
                        <b-form-select v-model="role_selected" :options="project_roles"/>
                    </b-form-group>
                    <b-button variant="primary" :disabled="isBtnDisabled" class="float-right" type="submit">
                        {{ (id) ? 'Сохранить' : 'Создать' }}
                    </b-button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable no-console */
    import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons'
    import {required, maxLength} from 'vuelidate/lib/validators'
    import {mapGetters} from 'vuex'

    export default {
        name: "Create",
        data() {
            return {
                name: "",
                purpose: "",
                expected_result: "",
                start_date: "",
                expected_date: "",
                role_selected: null,
                isBtnDisabled: false,
                project_roles: [
                    {value: null, text: 'Please select an option'},
                ]
            }
        },
        validations: {
            name: {
                required,
                maxLength: maxLength(255)
            },
            start_date: {
                required,
            },
            expected_date: {
                required
            }
        },
        props: [
            'id'
        ],
        methods: {
            ...mapGetters('auth', [
                'getUser'
            ]),
            createProject() {
                if (!this.$v.$invalid) {
                    this.isBtnDisabled = true;
                    let user = this.getUser();
                    if (!this.id) {
                        this.$http.post('projects', {
                            name: this.name,
                            purpose: this.purpose,
                            expected_result: this.expected_result,
                            start_date: this.start_date,
                            expected_date: this.expected_date,
                            project_role_id: this.role_selected,
                            user_id: user.id,
                        }).then(() => {
                            this.$router.push('/projects');
                        });
                    } else {
                        this.$http.put('projects/' + this.id, {
                            name: this.name,
                            purpose: this.purpose,
                            expected_result: this.expected_result,
                            start_date: this.start_date,
                            expected_date: this.expected_date,
                            project_role_id: this.role_selected,
                            user_id: user.id,
                        }).then(() => {
                            this.$router.push('/projects');
                        });
                    }
                }
            },
            formatDate(date) {
                let start_date = new Date(date),
                    month = '' + (start_date.getMonth() + 1),
                    day = '' + start_date.getDate(),
                    year = start_date.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            }
        },
        created() {
            // this.$v.name.$touch();
            // console.log(this.$v.name.$error);
            this.$fontAwesome.add(faCalendarAlt);
            this.$http.get('project_roles').then((response) => {
                if (response.data.data) {
                    response.data.data.forEach((val) => {
                        this.project_roles.push({
                            value: val.id,
                            text: val.name,
                        })
                    })
                }
            });
            if (this.id) {
                this.$http.get('projects/' + this.id).then((response) => {
                    let data = response.data.data;
                    this.name = data.name;
                    this.purpose = data.purpose;
                    this.expected_result = data.expected_result;
                    this.start_date = this.formatDate(data.start_date);
                    this.expected_date = this.formatDate(data.expected_date);
                });
            }
        }
    }
</script>

<style scoped>

</style>