<template>

    <v-card>
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
            rounded
            dark
            color="deep-purple accent-4">Delete</v-btn>
            <v-btn
            rounded
            dark
            color="deep-purple accent-4">Edit</v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>
export default {
  props: ['taskList'],
  mounted () {
    console.log('task list card mounted', this.taskList)
  }
}
</script>
