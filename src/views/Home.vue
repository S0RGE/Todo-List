<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      >
      <TaskList />
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
      drawer: false
    }
  },
  components: {
    Footer,
    TaskList,
    Task
  },
  methods: {
    toggleTaskList () {
      this.drawer = !this.drawer
    }
  }
}
</script>
