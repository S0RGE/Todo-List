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
            v-model="taskDescription"
            label="Task Description"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="6"
        >
          <v-btn @click="editTask()" dark width="100%" color="deep-purple accent-4">Save</v-btn>
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
  props: [
    'id'
  ],
  data () {
    return {
      valid: false,
      taskName: '',
      taskDescription: ''
    }
  },
  methods: {
    editTask () {
      console.log('id', this.id)
      this.$emit('addTask', { taskName: this.taskName, taskDescription: this.taskDescription, id: this.id })
      this.taskName = this.taskDescription = ''
      this.closeForm()
    },
    closeForm () {
      this.$emit('closeForm')
    }
  }
}
</script>
