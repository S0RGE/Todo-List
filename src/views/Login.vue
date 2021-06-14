<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="login"
            label="First name"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="password"
            label="Password"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn dark>
          Login
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    login: '',
    password: ''
  })
}
</script>
