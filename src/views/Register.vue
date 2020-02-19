<template>
  <div class="d-flex align-content-center flex-wrap">
    <div class="container">
      <div class="login-content">
        <div class="login-logo">
          <router-link to="/">
            Citron System
          </router-link>
        </div>
        <div class="login-form">
          <form
            action=""
            @submit.prevent="register"
          >
            <div class="form-group">
              <label>Surname</label>
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
              <label>Name<span class="text-danger">*</span></label>
              <input
                v-model.trim="$v.user_name.$model"
                type="text"
                class="form-control"
                placeholder="Name"
                @blur="$v.user_name.$touch()"
              >
              <div
                v-if="$v.user_name.$error || errors.user_name"
                class="errors"
              >
                <span
                  v-if="errors.user_name"
                  class="text-danger"
                >{{ errors.user_name[0] }}</span>
                <span
                  v-else-if="!$v.user_name.required"
                  class="text-danger"
                >Field Name is required</span>
                <span
                  v-else-if="!$v.user_name.maxLength"
                  class="text-danger"
                >The name may not be greater than {{ $v.user_name.$params.maxLength.max }}</span>
              </div>
            </div>
            <div class="form-group">
              <label>Middle Name</label>
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
              <label>Email address<span class="text-danger">*</span></label>
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
            <div class="form-group">
              <label>Password<span class="text-danger">*</span></label>
              <input
                v-model.trim="password"
                type="password"
                class="form-control"
                placeholder="Password"
                @blur="$v.password.$touch()"
              >
              <div
                v-if="$v.password.$error || errors.password"
                class="errors"
              >
                <span
                  v-if="errors.password"
                  class="text-danger"
                >{{ errors.password[0] }}</span>
                <span
                  v-else-if="!$v.password.required"
                  class="text-danger"
                >Field password is required</span>
                <span
                  v-else-if="!$v.password.minLength"
                  class="text-danger"
                >Password must have at least {{ $v.password.$params.minLength.min }} letters.</span>
                <span
                  v-else-if="!$v.password.maxLength"
                  class="text-danger"
                >The email may not be greater than {{ $v.password.$params.maxLength.max }}</span>
              </div>
            </div>
            <button
              class="btn btn-primary btn-flat m-b-30 m-t-30"
              @click.prevent="register"
            >
              REGISTER
            </button>
          </form>
          <div class="register-link mt-2 pt-2 text-center">
            <p>
              Already have account?
              <router-link to="login">
                Sign in
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {required, maxLength, email, minLength} from 'vuelidate/lib/validators'
import {mapMutations} from 'vuex'

export default {
  name: "Register",
  data() {
    return {
      errors: {},
      surname: '',
      user_name: '',
      middle_name: '',
      email: '',
      password: '',
    }
  },
  validations: {
    surname: {
      maxLength: maxLength(255)
    },
    user_name: {
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
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(255)
    }
  },
  methods: {
    ...mapMutations('auth', [
      'setToken',
      'setUser'
    ]),
    register: function () {
      const {user_name, surname, middle_name, email, password} = this;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let user_data = {
          name: user_name,
          email: email,
          password: password
        };
        if (surname) {
          user_data.surname = surname
        }
        if (middle_name) {
          user_data.middle_name = middle_name
        }

        this.$http.post('auth/register', user_data)
          .then(() => {
            this.$http.post('auth/login', {
              email: this.email,
              password: this.password
            }).then((response) => {
              this.setToken(response.data.access_token);
              this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
              this.$http.post('auth/me').then((response) => {
                this.setUser(response.data.data);
                this.$router.push('/');
              });
            });
          }).catch(error => {
            this.errors = (error.response.data.errors);
            setInterval(() => {
              this.errors = {}
            }, 5000);
          })
      }
    }
  },
}
</script>

<style scoped>
</style>