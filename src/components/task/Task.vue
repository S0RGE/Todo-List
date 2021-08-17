<template>
  <v-card max-width="100%" class="mx-auto">
    <v-app-bar dark color="deep-purple accent-4">
      <v-app-bar-nav-icon @click="$emit('toggleTaskList')"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="$vuetify.breakpoint.name !== 'xs'"
        >List</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-text-field class="mt-4" v-model="taskFind" label="Find Task">
        <v-icon v-if="taskFind" slot="append" @click="taskFind = ''">
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
          v-for="(task, i) in filteredTasks"
          :key="i"
          cols="10"
          class="mx-auto"
        >
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                dark
                :color="task.isDone ? 'grey' : 'deep-purple accent-4'"
                :elevation="hover ? 24 : 6"
              >
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                      class="text-h5"
                      :class="{ priorityItem: task.priority }"
                      v-text="task.title"
                    ></v-card-title>
                    <v-card-subtitle
                      v-text="task.description"
                    ></v-card-subtitle>
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
                        @click="deleteTask(task)"
                      >
                        Delete Task
                      </v-btn>
                      <v-btn
                        class="ml-2 mt-5"
                        outlined
                        rounded
                        small
                        @click="doneTask(task)"
                      >
                        Done Task
                      </v-btn>
                    </v-card-actions>
                  </div>
                  <v-avatar
                    v-if="
                      $vuetify.breakpoint.name !== 'xs' &&
                        $vuetify.breakpoint.name !== 'sm'
                    "
                    class="ma-3"
                    size="125"
                    tile
                  >
                    <v-img
                      @click="editPicture()"
                      style="cursor: pointer"
                      :src="task.src"
                    ></v-img>
                  </v-avatar>
                </div>
              </v-card>
            </template>
          </v-hover>
        </v-col>
        <v-col cols="10" class="mx-auto">
          <v-btn
            v-if="$route.params.listUUID"
            dark
            @click="dialog = !dialog"
            color="deep-purple accent-4"
            width="100%"
            >Add task</v-btn
          >
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
            <v-toolbar color="deep-purple accent-4" dark>Edit Task</v-toolbar>
            <v-card-text>
              <TaskEdit
              :id="id"
              :task="tasks[id]"
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
import genUUID from '@/../scripts/UUID.js'

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
  mixins: [genUUID],
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      await this.$router.push({ name: 'Login' })
    },
    doneTask (task) {
      const doneId = this.tasks.indexOf(task)
      this.tasks[doneId].isDone = !this.tasks[doneId].isDone
    },
    editTask (idx) {
      this.id = idx
      this.dialog = true
    },
    closeForm () {
      this.id = null
      this.dialog = false
    },
    async deleteTask (task) {
      await this.$store.dispatch('deleteTaskAsync', task)
    },
    editPicture () {
      console.error('not implement exception')
    },
    async addTask (task) {
      const newTask = {
        uuid: this.tasks[task.id]?.uuid || this.generateUUID(),
        color: task.color || '#952175',
        src:
          task.src ||
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlUGwpR2u_hnvnP0q2r-F8UoAYsTaWDz2aSg&usqp=CAU',
        title: task.taskName,
        description: task.taskDescription,
        created:
          task.created ||
          new Date()
            .toJSON()
            .slice(0, 10)
            .replace(/-/g, '/'),
        priority: task.priority,
        isDone: task.isDone || false,
        list: this.$route.params.listUUID
      }
      if (this.id !== null) {
        await this.$store.dispatch('editTaskAsync', newTask)
      } else {
        await this.$store.dispatch('addTodoTask', newTask)
      }
    }
  },
  computed: {
    filteredTasks () {
      return this.sortedTasks.filter(task => task.title.toLowerCase().includes(this.taskFind.toLowerCase()))
    },
    sortedTasks () {
      return this.tasks?.filter(
        item => item.list === this.$route.params.listUUID
      )
    }
  },
  async mounted () {
    await this.$store.dispatch('getTasksAsync') // TODO: another way to do ?
    this.tasks = this.$store.getters.getTasks
  }
}
</script>

<style>
.priorityItem {
  color: red;
}
</style>
