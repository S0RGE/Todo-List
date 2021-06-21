<template>
<v-container>
    <v-card>
      <v-list>
        <v-text-field
        label="Find Task List"
        class="mx-2"
        v-model="searchField"
        >
        <v-icon
        v-if="searchField"
        slot="append"
        @click="searchField = ''"
        >
        mdi-close
        </v-icon>
        </v-text-field>
        <v-list-item-group v-model="model" max-height>
          <v-list-item
            v-for="(item, i) in searchResults"
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
      >
       <v-icon
        v-if="taskList"
        slot="append"
        @click="taskList = ''"
        >
        mdi-close
        </v-icon>
        </v-text-field>
    <v-card-actions>
      <v-btn
      @click="addTaskList()"
      width="100%"
      dark
      color="deep-purple accent-4"
      >Add List</v-btn>
    </v-card-actions>
  </v-card>
</v-container>
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
      taskList: '',
      searchField: ''
    }
  },
  methods: {
    addTaskList () {
      this.items.push({
        icon: 'mdi-inbox',
        text: this.taskList
      })
      this.$store.dispatch('addTodoList', this.taskList)
      this.taskList = ''
    }
  },
  computed: {
    searchResults () {
      return this.items.filter(item => item.text?.toLowerCase().includes(this.searchField.toLowerCase()))
    }
  }
}
</script>
