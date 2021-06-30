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
            v-for="(list, idx) in searchResults"
            :key="idx"
          >
            <v-list-item-content>
              <router-link
                :to="{name: 'TaskId', params: {listUUID: list.uuid}}"
              >
              <v-btn
              width="100%"
              dark
              color="deep-purple accent-4"
              >
                {{ list.name }}
                <v-divider></v-divider>
              <v-icon
              right
              dark
              @click.prevent="editTaskList(list)"
              >mdi-pencil</v-icon>
              </v-btn>
              </router-link>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-text-field
      label="Add Task List"
      class="mx-2"
      v-model="taskList"
      v-on:keyup.enter="addTaskList()"
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
  <v-dialog
  max-width="400"
  v-model="taskListCardDialog">
  <TaskListCard
  :taskList="list"
  @closeTaskListForm="closeTaskListForm"
  />
  </v-dialog>
</v-container>
</template>

<script>
import TaskListCard from './TaskListCard'
import UUID from '@/../scripts/UUID.js'

export default {
  props: ['tasksList'],
  data () {
    return {
      taskListCardDialog: false,
      lists: [],
      model: 1,
      taskList: '',
      searchField: '',
      list: '' // TODO: dog-nail
    }
  },
  components: {
    TaskListCard
  },
  mixins: [UUID],
  methods: {
    closeTaskListForm () {
      this.taskListCardDialog = false
    },
    addTaskList () {
      this.lists.push({
        icon: 'mdi-inbox',
        text: this.taskList
      })
      this.$store.dispatch('addTodoListAsync', { name: this.taskList, uuid: this.generateUUID() })
      this.taskList = ''
    },
    editTaskList (list) {
      this.list = list
      this.taskListCardDialog = !this.taskListCardDialog
    }
  },
  computed: {
    searchResults () {
      return this.tasksList.filter(item => item.name.toLowerCase().includes(this.searchField.toLowerCase()))
    },
    editedTaskList () {
      return this.tasksList.find(list => list.uuid === this.$route.params.listUUID)
    }
  }
}
</script>
