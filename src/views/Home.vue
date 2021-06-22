<template>
  <v-app>
    <v-navigation-drawer
      v-model="navigate"
      absolute
      temporary
      >
      <TaskList
        :tasksList="tasksList"
      />
    </v-navigation-drawer>
    <v-main>
     <Task
      @toggleTaskList='toggleTaskList'
     />
    </v-main>
    <v-footer padless>
      <Footer />
    </v-footer>
  </v-app>
</template>

<script>
import Footer from '@/components/Footer.vue'
import TaskList from '@/components/TaskList/TaskList.vue'
import Task from '@/components/task/Task.vue'

export default {
  name: 'App',
  data () {
    return {
      tasksList: [],
      navigate: false
    }
  },
  components: {
    Footer,
    TaskList,
    Task
  },
  methods: {
    toggleTaskList () {
      this.navigate = !this.navigate
    }
  },
  async mounted () {
    await this.$store.dispatch('getTaskListByUser')
    this.tasksList = this.$store.getters.getTaskList
  }
}
</script>
