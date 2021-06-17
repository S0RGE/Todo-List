<template>
  <v-form v-model="valid" >
     <v-card
      class="mx-auto my-4"
      max-width="400"
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="email"
            outlined
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="password"
            outlined
            label="Password"
            required
          ></v-text-field>
        </v-col>
        <v-btn class="ma-3" dark @click="login">
          Login
      </v-btn>
      </v-row>
    </v-container>
    </v-card>
  </v-form>
</template>

<script>
import firebase from 'firebase/app'

export default {
  data: () => ({
    valid: false,
    email: '',
    password: ''
  }),
  methods: {
    async login () {
      const userData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', userData)
        localStorage.isAunthentificated = true
        this.$router.push('/')
      } catch (e) {}
      console.log('firebase', firebase.auth())
    }
  }
}
</script>
