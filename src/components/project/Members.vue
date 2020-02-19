<template>
    <div class="col-sm-6 mt-4">
        <div class="card">
            <div class="card-header">
                Участники проекта
                <b-button class="float-right" v-b-modal.create-invite-modal>
                    <font-awesome-icon icon="plus"/>
                </b-button>
            </div>
            <div class="card-body">
                <b-table striped hover :items="users"
                         :fields="[{key: 'name', label: 'Имя'}, {key: 'role', label: 'Роль'}, {key: 'confirmed', label: 'Статус' }, {key: 'actions', label: 'Действия'}]">
                    <template v-slot:cell(actions)="row">
                        <b-button @click="showEditRoleUser(row.item.project_user_id)" class="float-left">
                            <font-awesome-icon icon="edit"/>
                        </b-button>
                        <b-button @click="kickUser(row.item.project_user_id)" variant="danger" class="float-left ml-2">
                            <font-awesome-icon icon="trash"/>
                        </b-button>
                    </template>
                </b-table>
            </div>
        </div>
        <b-modal id="create-invite-modal" :title="isEdit ? 'Редактирование приглашения' : 'Создание приглашения'">
            <b-alert :show="!!add_error" variant="danger" @dismissed="add_error=''" dismissible>
                {{ add_error }}
            </b-alert>
            <form action="" @submit.prevent="addMember">
                <b-form-group
                        v-if="!isEdit"
                        label-cols-sm="4"
                        label-cols-lg="3"
                        label="E-mail"
                >
                    <b-input-group>
                        <b-form-input
                                v-model.trim="email"
                                :state="$v.email.required && $v.email.maxLength && $v.email.email"
                                aria-describedby="invalid_input_name"
                                placeholder="Введите название ресурса"/>
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
                    <b-form-select v-model="selected_role" :options="this.roles"></b-form-select>
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
    import {required, email, maxLength} from 'vuelidate/lib/validators'

    export default {
        name: "Members",
        props: [
            'id'
        ],
        data() {
            return {
                status_id: null,
                user_id: null,
                users: [],
                email: null,
                edit_id: null,
                isEdit: false,
                roles: [],
                selected_role: 1,
                add_error: '',
            }
        },
        validations: {
            email: {
                required,
                email,
                maxLength: maxLength(255)
            }
        },
        created() {
            this.updateUsers();
            this.$http.get('project_roles').then(response => {
                response.data.data.forEach(value => {
                    this.roles.push({value: value.id, text: value.name})
                });
            });
        },
        methods: {
            showEditRoleUser(id) {
                this.isEdit = true;
                this.$bvModal.show('create-invite-modal');
                this.$http.get('project_users/' + id).then(response => {
                    let data = response.data.data;
                    this.status_id = data.status_id;
                    this.edit_id = data.id;
                    this.selected_role = data.project_role.id
                })
            },
            addMember() {
                if (!this.$v.$invalid) {
                    this.$http.get('users?email=' + this.email).then((response) => {
                        let data = response.data.data;
                        if (data[0]) {
                            this.$http.post('project_invites', {
                                user_id: data[0].id,
                                project_id: this.id,
                                project_role_id: this.selected_role
                            }).then((response) => {
                                // eslint-disable-next-line no-console
                                console.log(response);
                                if (response.data.error) {
                                    this.add_error = response.data.error;
                                } else {
                                    this.$bvModal.hide('create-invite-modal');
                                    this.selected_role = 1;
                                    this.email = '';
                                    this.updateUsers();
                                }
                            })
                        } else {
                            this.add_error = 'Пользователь не найден';
                        }
                    })
                }
            },
            editInvite() {
                if (this.selected_role) {
                    this.$http.put('project_users/' + this.edit_id, {
                        project_role_id: this.selected_role
                    }).then(() => {
                        this.updateUsers();
                        this.hideInviteModal();
                    })
                }
            },
            hideInviteModal() {
                this.$bvModal.hide('create-invite-modal');
                this.isEdit = false;
            },
            kickUser(id) {
                this.$http.delete('projects/kick_user/' + id).then(() => {
                    this.updateUsers();
                });
            },
            updateUsers() {
                this.$http.get('projects/' + this.id + '/users').then((response) => {
                    let users = response.data.data;
                    this.users = [];
                    // eslint-disable-next-line no-console
                    console.log(users);
                    users.forEach(value => {
                        let user = value.user;
                        user.project_user_id = value.id;
                        user.id = value.user.id;
                        user.name = value.user.name;
                        user.role = value.project_role.name;
                        user.confirmed = value.confirmed ? 'Подтвержден' : 'Заявка отправлена';
                        this.users.push(user);
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>