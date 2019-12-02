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
          <div
            v-show="invalidLogin"
            class="alert alert-danger"
          >
            Invalid email or password
            <button
              type="button"
              class="close"
              @click="invalidLogin = false"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form
            action=""
            @submit.prevent="login"
          >
            <div class="form-group">
              <label>Email address<span class="text-danger">*</span></label>
              <input
                v-model.trim="email"
                type="text"
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
                >The password may no be greater than {{ $v.password.$params.maxLength.max }}</span>
              </div>
            </div>
            <button class="btn btn-success btn-flat">
              LOGIN
            </button>
          </form>
          <div class="register-link mt-2 pt-2 text-center">
            <p>
              Don't have account?
              <router-link to="/register">
                Sign up here
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {required, minLength, email, maxLength} from 'vuelidate/lib/validators'
import {mapMutations} from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      errors: {},
      invalidLogin: false,
    }
  },
  validations: {
    email: {
      required,
      email,
      maxLength: maxLength(255)
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(255)
    },
  },
  methods: {
    ...mapMutations('auth', [
      'setToken',
      'setUser'
    ]),
    login() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
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
        }).catch((error) => {
          this.invalidLogin = true;
          this.errors = error.response.data
        });
      }
    }
  }
}
</script>

<style scoped>
</style>