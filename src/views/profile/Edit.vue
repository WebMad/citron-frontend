<template>
    <div class="login-form">
        <form
                action=""
                @submit.prevent="register"
        >
            <div class="form-group">
                <label>Фамилия</label>
                <input
                        v-model.trim="$v.surname.$model"
                        type="text"
                        class="form-control"
                        placeholder="Surname"
                        @blur="$v.surname.$touch()"
                >
                <div
                        v-if="$v.surname.$error || errors.surname"
                        class="errors"
                >
                <span
                        v-if="errors.surname"
                        class="text-danger"
                >{{ errors.surname[0] }}</span>
                    <span
                            v-else-if="!$v.surname.maxLength"
                            class="text-danger"
                    >The surname may not be greater than {{ $v.surname.$params.maxLength.max }}</span>
                </div>
            </div>
            <div class="form-group">
                <label>Имя<span class="text-danger">*</span></label>
                <input
                        v-model.trim="$v.name.$model"
                        type="text"
                        class="form-control"
                        placeholder="Name"
                        @blur="$v.name.$touch()"
                >
                <div
                        v-if="$v.name.$error || errors.name"
                        class="errors"
                >
                <span
                        v-if="errors.name"
                        class="text-danger"
                >{{ errors.name[0] }}</span>
                    <span
                            v-else-if="!$v.name.required"
                            class="text-danger"
                    >Field Name is required</span>
                    <span
                            v-else-if="!$v.name.maxLength"
                            class="text-danger"
                    >The name may not be greater than {{ $v.name.$params.maxLength.max }}</span>
                </div>
            </div>
            <div class="form-group">
                <label>Отчество</label>
                <input
                        v-model.trim="middle_name"
                        type="text"
                        class="form-control"
                        placeholder="Middle Name"
                        @blur="$v.middle_name.$touch()"
                >
                <div
                        v-if="$v.middle_name.$error || errors.middle_name"
                        class="errors"
                >
                <span
                        v-if="errors.middle_name"
                        class="text-danger"
                >{{ errors.middle_name[0] }}</span>
                    <span
                            v-else-if="!$v.middle_name.maxLength"
                            class="text-danger"
                    >The middle name may not be greater than {{ $v.middle_name.$params.maxLength.max }}</span>
                </div>
            </div>
            <div class="form-group">
                <label>Email<span class="text-danger">*</span></label>
                <input
                        v-model.trim="email"
                        type="email"
                        class="form-control"
                        placeholder="Email"
                        @blur="$v.email.$touch()"
                >
                <div
                        v-if="$v.email.$error || errors.email"
                        class="errors"
                >
                <span
                        v-if="errors.email"
                        class="text-danger"
                >{{ errors.email[0] }}</span>
                    <span
                            v-else-if="!$v.email.required"
                            class="text-danger"
                    >Field email is required</span>
                    <span
                            v-else-if="!$v.email.email"
                            class="text-danger"
                    >The email must be a valid email address.</span>
                    <span
                            v-else-if="!$v.email.maxLength"
                            class="text-danger"
                    >The email may not be greater than {{ $v.email.$params.maxLength.max }}</span>
                </div>
            </div>
            <button
                    class="btn btn-success btn-flat m-b-30 m-t-30"
                    @click.prevent="save"
            >
                СОХРАНИТЬ
            </button>
        </form>
    </div>
</template>

<script>
    import {required, maxLength, email} from 'vuelidate/lib/validators'
    import {mapGetters, mapMutations} from "vuex";

    export default {
        name: "Edit",
        data() {
            return {
                errors: {},
                surname: '',
                name: '',
                middle_name: '',
                email: '',
            }
        },
        computed: {
            ...mapGetters("auth", ["getUser"])
        },
        created() {
            Object.assign(this.$data, this.getUser)
        },
        validations: {
            surname: {
                maxLength: maxLength(255)
            },
            name: {
                required,
                maxLength: maxLength(255)
            },
            middle_name: {
                maxLength: maxLength(255)
            },
            email: {
                required,
                maxLength: maxLength(255),
                email
            }
        },
        methods: {
            ...mapMutations("auth", ["setUser"]),
            save() {
                const {name, surname, middle_name, email} = this;
                if (!this.$v.$invalid) {
                    let user_data = {
                        name: name,
                    };
                    if (surname) {
                        user_data.surname = surname
                    }
                    if (middle_name) {
                        user_data.middle_name = middle_name
                    }
                    if (email !== this.getUser.email) {
                        user_data.email = email
                    }
                    this.$v.$touch();
                    this.$http.put(`users/${this.getUser.id}`, user_data)
                        .then(() => {
                            this.$http.post('auth/me').then((response) => {
                                this.setUser(response.data.data);
                                this.$router.push('/profile');
                            });
                        }).catch(error => {
                        this.errors = (error.response.data.errors);
                        setInterval(() => {
                            this.errors = {}
                        }, 5000);
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>