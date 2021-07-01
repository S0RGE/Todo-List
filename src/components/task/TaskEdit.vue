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
          cols="12"
        >
         <v-checkbox
      v-model="priority"
      label="Priority"
    ></v-checkbox>
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
    'id',
    'task'
  ],
  data () {
    return {
      valid: false,
      taskName: '',
      taskDescription: '',
      priority: false
    }
  },
  methods: {
    editTask () {
      this.$emit('addTask', {
        taskName: this.taskName,
        taskDescription: this.taskDescription,
        id: this.id,
        priority: this.priority
      })
      this.taskName = this.taskDescription = ''
      this.priority = false
      this.closeForm()
    },
    closeForm () {
      this.$emit('closeForm')
    }
  },
  mounted () { // TODO: do not work correctly
    this.taskName = this.task.title
    this.taskDescription = this.task.description
    this.priority = this.task.priority
  }
}
</script>
