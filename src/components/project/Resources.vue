<template>
    <div class="col-sm-6 mt-4">
        <div class="card">
            <div class="card-header">
                Ресурсы проекта
                <b-button class="float-right" v-b-modal.create-resource-modal>
                    <font-awesome-icon icon="plus"/>
                </b-button>
            </div>
            <div class="card-body">
                <b-table striped hover :items="stages"
                         :fields="[{key: 'position', label: 'Номер'}, {key: 'name', label: 'Название'}, {key: 'actions', label: 'Действия'}]">
                    <template v-slot:cell(actions)="row">
                        <b-button @click="showEditResource(row.item.id)" class="float-left">
                            <font-awesome-icon icon="edit"/>
                        </b-button>
                        <b-button @click="deleteResource(row.item.id)" variant="danger" class="float-left ml-2">
                            <font-awesome-icon icon="trash"/>
                        </b-button>
                    </template>
                </b-table>
            </div>
        </div>
        <b-modal id="create-resource-modal" :title="isEdit ? 'Редактирование ресурса' : 'Создание ресурса'">
            <form action="" @submit.prevent="createResource">
                <b-form-group
                        label-cols-sm="4"
                        label-cols-lg="3"
                        label="Номер ресурса"
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
                        label="Название"
                >
                    <b-input-group>
                        <b-form-input
                                v-model.trim="name"
                                :state="$v.name.required && $v.name.maxLength"
                                aria-describedby="invalid_input_name"
                                placeholder="Введите название ресурса"/>
                        <b-form-invalid-feedback v-if="!$v.name.required" id="invalid_input_name">
                            Поле Описание обязательно для заполнения
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback v-if="!$v.name.maxLength" id="invalid_input_name">
                            Длина поля Описание не должна превышать 255 символов
                        </b-form-invalid-feedback>
                    </b-input-group>
                </b-form-group>
            </form>
            <template v-slot:modal-footer>
                <b-button @click="hideCreateForm" variant="outline-secondary">Отмена</b-button>
                <b-button variant="primary" @click="isEdit ? editResource() : createResource()">Сохранить</b-button>
            </template>

        </b-modal>
    </div>
</template>

<script>
    import {faPlus, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
    import {required, maxLength, numeric, minValue} from 'vuelidate/lib/validators'

    export default {
        name: "Resources",
        data() {
            return {
                stages: [],
                name: "",
                position: 1,
                isEdit: false,
            }
        },
        props: [
            'id'
        ],
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
        created() {
            this.$fontAwesome.add(faPlus, faEdit, faTrash);
            this.updateResource();
        },
        methods: {
            hideCreateForm() {
                this.$bvModal.hide('create-resource-modal');
                this.isEdit = false;
            },
            createResource() {
                if (!this.$v.$invalid) {
                    this.$http.post('project_resources', {
                        name: this.name,
                        position: this.position,
                        project_id: this.id,
                    }).then(() => {
                        this.name = '';
                        this.position = 1;
                        this.$bvModal.hide('create-resource-modal');
                        this.updateResource();
                    });
                }
            },
            updateResource() {
                this.$http.get('projects/' + this.id + '/resources').then((response) => {
                    this.stages = response.data.data;
                })
            },
            deleteResource(id) {
                this.$http.delete('project_resources/' + id).then(() => {
                    this.updateResource();
                });
            },
            showEditResource(id) {
                this.isEdit = true;
                this.editStageId = id;
                this.$bvModal.show('create-resource-modal');
                this.$http.get('project_resources/' + id).then((response) => {
                    let data = response.data.data;
                    this.name = data.name;
                    this.position = data.position
                });
            },
            editResource() {
                this.$http.put('project_resources/' + this.editStageId, {
                    project_id: this.id,
                    name: this.name,
                    position: this.position,
                }).then(() => {
                    this.updateResource();
                    this.hideCreateForm();
                })
            }
        }
    }
</script>

<style scoped>

</style>