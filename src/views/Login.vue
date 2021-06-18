<template>
  <v-tabs
  v-model="tab"
  grow
  >
    <v-tab href="#tab-1">Login</v-tab>
    <v-tab href="#tab-2">Register</v-tab>
    <v-tabs-items
    v-model="tab"
    >
      <v-tab-item
      value="tab-1"
      >
      <v-card
      class="mx-auto my-4"
      max-width="400"
  >
    <v-container>
      <v-form>
      <v-row>
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="email"
            outlined
            label="E-mail"
            hide-details="auto"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
        >
          <v-text-field
          hide-details="auto"
            v-model="password"
            type="password"
            outlined
            label="Password"
          ></v-text-field>
        </v-col>
        <v-btn rounded class="ma-3" dark @click="login">
          Login
      </v-btn>
      </v-row>
      </v-form>
    </v-container>
    </v-card>
      </v-tab-item>
      <v-tab-item
      value="tab-2"
      >
      <v-card
      class="mx-auto my-4"
      max-width="400">
      <v-form>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                v-model="email"
                outlined
                label="Email"
                hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                hide-details="auto"
                v-model="password"
                type="password"
                outlined
                label="Password"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                hide-details="auto"
                outlined
                label="Name"
                v-model="name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                outlined
                label="Agree the statement"
                v-model="agreeTheStatement"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn class="ma-3"  @click="register()" dark rounded>Register</v-btn>
          </v-card-actions>
          </v-form>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
export default {
  data: () => ({
    tab: null,
    name: '',
    valid: false,
    email: '',
    password: '',
    agreeTheStatement: '',
    regDialog: false
  }),
  methods: {
    async login () {
      const userData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', userData)
        this.$router.push('/')
        this.email = this.password = ''
      } catch (e) {}
    },
    async register () {
      const newUser = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        await this.$store.dispatch('register', newUser)
        this.email = this.password = ''
      } catch (e) {}
    }
  }
}
</script>
