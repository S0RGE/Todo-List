<template>
  <v-tabs
  v-model="tab"
  grow
  >
    <v-tab href="#tab-1" @click="resetFields()">Login</v-tab>
    <v-tab href="#tab-2" @click="resetFields()">Register</v-tab>
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
                :rules="emailRules"
                label="Email"
                hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                hide-details="auto"
                v-model="password"
                type="password"
                :rules="passwordRules"
                outlined
                label="Password"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                hide-details="auto"
                outlined
                label="Name"
                :rules="nameRules"
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
    agreeTheStatement: false,
    passwordRules: [
      v => !!v.trim() || 'Введите пароль',
      v =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/.test(v) ||
      'Пароль должен содержать минимум 8 символов, 1 прописную букву, 1 строчную букву, 1 цифру'
    ],
    emailRules: [
      v => !!v.trim() || 'Введите Вашу электронную почту',
      v =>
        /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || 'Введите правильную электронную почту',
      v => v.length <= 100 || 'Слишком большая почта'
    ],
    nameRules: [
      v => !!v.trim() || 'Введите Ваше имя',
      v => v.length <= 35 || 'Слишком большое имя',
      v =>
        /^([a-zа-яё]+|\d+)$/i.test(v) ||
      'Имя должно содержать только русский и латинский алфавит'
    ]
  }),
  methods: {
    resetFields () {
      this.email = this.password = this.name = ''
      this.agreeTheStatement = false
    },
    async login () {
      // if (this.email.trim() === '' || this.password.trim() === '') return
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
      // if (this.name.trim() === '' || this.password.trim() === '' || this.agreeTheStatement || this.email.trim() === '') return
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
