<template>
    <v-card>
      <v-list>
        <v-list-item-group v-model="model" max-height>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-text-field
      label="Add Task List"
      class="mx-2"
      v-model="taskList"
      ></v-text-field>
    <v-card-actions>
      <v-btn
      @click="addTaskList()"
      width="100%"
      dark
      color="deep-purple accent-4"
      >Add List</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          icon: 'mdi-inbox',
          text: 'first'
        },
        {
          icon: 'mdi-inbox',
          text: 'second'
        },
        {
          icon: 'mdi-inbox',
          text: 'third'
        },
        {
          icon: 'mdi-inbox',
          text: 'forth'
        }
      ],
      model: 1,
      taskList: ''
    }
  },
  methods: {
    addTaskList () {
      this.items.push({
        icon: 'mdi-inbox',
        text: this.taskList
      })
      // this.$store.dispatch('addTodoList', this.taskList)
      this.taskList = ''
    }
  }
}
</script>
