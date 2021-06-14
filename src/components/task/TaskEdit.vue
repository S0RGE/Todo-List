<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="taskName"
            label="Task Name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
        >
          <v-text-field
            v-model="taskText"
            label="Task Text"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="6"
        >
          <v-btn @click="closeForm()" dark width="100%" color="deep-purple accent-4">Save</v-btn>
        </v-col>
        <v-col
          cols="6"
        >
          <v-btn @click="closeForm()" dark width="100%" color="deep-purple accent-4">Cancel</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    taskName: '',
    taskText: ''
  }),
  methods: {
    closeForm () {
      this.$emit('closeForm')
    }
  }
}
</script>
