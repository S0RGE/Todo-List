<template>

    <v-card class="mx-auto" max-width="400">
        <v-card-title>
            <v-text-field
            :label="taskList.name">
            </v-text-field>
        </v-card-title>

        <v-card-text>
             <v-text-field
            :label="taskList.count.toString()">
            </v-text-field>
             <v-text-field
            :label="taskList.created">
            </v-text-field>
             <v-text-field
            :label="taskList.updated">
            </v-text-field>
            <v-checkbox
            label="isDone"
            v-model="taskList.isDone"
            ></v-checkbox>
        </v-card-text>

        <v-card-actions>
            <v-btn
            @click="closeTaskListForm"
            rounded
            dark
            color="deep-purple accent-4">Delete</v-btn>
            <v-btn
            @click="closeTaskListForm"
            rounded
            dark
            color="deep-purple accent-4">Edit</v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>
export default {
  props: ['taskList'],
  methods: {
    closeTaskListForm () {
      this.$emit('closeTaskListForm')
    }
  }
}
</script>
