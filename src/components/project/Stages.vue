<template>
    <div class="col-sm-6">
        <div class="card">
            <div class="card-header">
                Этапы проекта
                <b-button class="float-right" v-b-modal.create-stage-modal>
                    <font-awesome-icon icon="plus"/>
                </b-button>
            </div>
            <div class="card-body">
                <b-table striped hover :items="stages"
                         :fields="[{key: 'position', label: 'Номер'}, {key: 'description', label: 'Описание'}, {key: 'actions', label: 'Действия'}]">
                    <template v-slot:cell(actions)="row">
                        <b-button @click="showEditStage(row.item.id)" class="float-left">
                            <font-awesome-icon icon="edit"/>
                        </b-button>
                        <b-button @click="deleteStage(row.item.id)" variant="danger" class="float-left ml-2">
                            <font-awesome-icon icon="trash"/>
                        </b-button>
                    </template>
                </b-table>
            </div>
        </div>
        <b-modal id="create-stage-modal" :title="isEdit ? 'Редактирование этапа' : 'Создание этапа'">
            <form action="" @submit.prevent="createStage">
                <b-form-group
                        label-cols-sm="4"
                        label-cols-lg="3"
                        label="Номер этапа"
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
                <b-form-group
                        label-cols-sm="4"
                        label-cols-lg="3"
                        label="Описание"
                >
                    <b-input-group>
                        <b-form-input
                                v-model.trim="description"
                                :state="$v.description.required && $v.description.maxLength"
                                aria-describedby="invalid_input_name"
                                placeholder="Введите описание этапа"/>
                        <b-form-invalid-feedback v-if="!$v.description.required" id="invalid_input_name">
                            Поле Описание обязательно для заполнения
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback v-if="!$v.description.maxLength" id="invalid_input_name">
                            Длина поля Описание не должна превышать 255 символов
                        </b-form-invalid-feedback>
                    </b-input-group>
                </b-form-group>
            </form>
            <template v-slot:modal-footer>
                <b-button @click="hideCreateForm" variant="outline-secondary">Отмена</b-button>
                <b-button variant="primary" @click="isEdit ? editStage() : createStage()">Сохранить</b-button>
            </template>

        </b-modal>
    </div>
</template>

<script>
    import {faPlus, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
    import {required, maxLength, numeric, minValue} from 'vuelidate/lib/validators'

    export default {
        name: "Stages",
        data() {
            return {
                stages: [],
                description: "",
                position: 1,
                isEdit: false,
            }
        },
        props: [
            'id'
        ],
        validations: {
            description: {
                required,
                maxLength: maxLength(255),
            },
            position: {
                required,
                numeric,
                minValue: minValue(1)
            }
        },
        created() {
            this.$fontAwesome.add(faPlus, faEdit, faTrash);
            this.updateStages();
        },
        methods: {
            hideCreateForm() {
                this.$bvModal.hide('create-stage-modal');
                this.isEdit = false;
            },
            createStage() {
                if (!this.$v.$invalid) {
                    this.$http.post('project_stages', {
                        description: this.description,
                        position: this.position,
                        project_id: this.id,
                    }).then(() => {
                        this.description = '';
                        this.position = 1;
                        this.$bvModal.hide('create-stage-modal');
                        this.updateStages();
                    });
                }
            },
            updateStages() {
                this.$http.get('projects/' + this.id + '/stages').then((response) => {
                    this.stages = response.data.data;
                })
            },
            deleteStage(id) {
                this.$http.delete('project_stages/' + id).then(() => {
                    this.updateStages();
                });
            },
            showEditStage(id) {
                this.isEdit = true;
                this.editStageId = id;
                this.$bvModal.show('create-stage-modal');
                this.$http.get('project_stages/' + id).then((response) => {
                    let data = response.data.data;
                    this.description = data.description;
                    this.position = data.position
                });
            },
            editStage() {
                this.$http.put('project_stages/' + this.editStageId, {
                    project_id: this.id,
                    description: this.description,
                    position: this.position,
                }).then(() => {
                    this.updateStages();
                    this.hideCreateForm();
                })
            }
        }
    }
</script>

<style scoped>

</style>