<template>
  <v-card
    max-width="100%"
    class="mx-auto"
  >
    <v-app-bar
      dark
      color="deep-purple accent-4"
    >
      <v-app-bar-nav-icon @click="$emit('toggleTaskList')"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="$vuetify.breakpoint.name !== 'xs'">My TaskList</v-toolbar-title>
      <v-spacer></v-spacer>
       <v-text-field
            class="mt-4"
            v-model="taskFind"
            label="Find Task"
          >
          <v-icon
            v-if="taskFind"
            slot="append"
            @click="taskFind = ''"
            >
            mdi-close
            </v-icon>
          </v-text-field>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon @click="logout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container>
      <v-row dense>
        <v-col
          v-for="(item, i) in sortedTasks"
          :key="i"
          cols="10"
          class="mx-auto"
        >
          <v-card
            dark
            color="deep-purple accent-4"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                  :class="{ priorityItem: item.priority }"
                  v-text="item.title"
                >{{ item.title }}</v-card-title>
                <v-card-subtitle v-text="item.description"></v-card-subtitle>
                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    @click="editTask(i)"
                  >
                    Edit task
                  </v-btn>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    @click="deleteTask(item)"
                  >
                    Delete Task
                  </v-btn>
                </v-card-actions>
              </div>
              <v-avatar
                v-if="$vuetify.breakpoint.name !== 'xs' && $vuetify.breakpoint.name !== 'sm'"
                class="ma-3"
                size="125"
                tile
              >
                <v-img @click="editPicture()" style="cursor: pointer" :src="item.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
        <v-col cols="10" class="mx-auto">
        <v-btn dark
          @click="dialog = !dialog"
             color="deep-purple accent-4" width="100%">Add task</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-col cols="auto">
      <v-dialog
      v-model="dialog"
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template>
          <v-card>
            <v-toolbar
              color="deep-purple accent-4"
              dark
            >Edit Task</v-toolbar>
            <v-card-text>
              <TaskEdit
                :id="id"
                @closeForm="closeForm()"
                @addTask="addTask"
              />
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-card>
</template>

<script>
import TaskEdit from './TaskEdit.vue'

export default {
  data () {
    return {
      id: null,
      dialog: false,
      taskFind: '',
      tasks: []
    }
  },
  components: {
    TaskEdit
  },
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push({ name: 'Login' })
    },
    editTask (i) {
      this.id = i
      this.dialog = true
    },
    closeForm () {
      this.id = null
      this.dialog = false
    },
    deleteTask (task) {
      this.$store.dispatch('deleteTaskAsync', task)
    },
    editPicture () {
      console.error('not implement exeption')
    },
    addTask (task) {
      const newItem = {
        color: '#952175',
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlUGwpR2u_hnvnP0q2r-F8UoAYsTaWDz2aSg&usqp=CAU',
        title: task.taskName,
        description: task.taskDescription,
        priority: task.priority,
        isDone: false,
        list: this.$route.params.listName
      }
      if (this.id !== null) {
        this.tasks.splice(this.id, 1, newItem)
      } else {
        this.$store.dispatch('addTodoTask', newItem)
        this.tasks.push(newItem)
      }
    }
  },
  computed: {
    sortedTasks () {
      return this.tasks?.filter(item => item.list === this.$route.params.listName)
    }
  },
  async mounted () {
    await this.$store.dispatch('getTasks')
    this.tasks = this.$store.getters.getTasks
  }
}
</script>

<style>
.priorityItem {
  color: red;
}
</style>
