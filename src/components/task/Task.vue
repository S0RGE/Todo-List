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

      <v-toolbar-title>My TaskList</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container>
      <v-row dense>
        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        >
          <v-card
            dark
            color="deep-purple accent-4"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                  v-text="item.title"
                ></v-card-title>

                <v-card-subtitle v-text="item.description"></v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                  >
                    Edit task
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12">
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
                @closeForm="closeForm()"
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
  data: () => ({
    dialog: false,
    items: [
      {
        color: '#1F7087',
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlUGwpR2u_hnvnP0q2r-F8UoAYsTaWDz2aSg&usqp=CAU',
        title: 'Task',
        description: 'Task description'
      },
      {
        color: '#952175',
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlUGwpR2u_hnvnP0q2r-F8UoAYsTaWDz2aSg&usqp=CAU',
        title: 'Task',
        description: 'Task description'
      },
      {
        color: '#952175',
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlUGwpR2u_hnvnP0q2r-F8UoAYsTaWDz2aSg&usqp=CAU',
        title: 'Task',
        description: 'Task description'
      },
      {
        color: '#952175',
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlUGwpR2u_hnvnP0q2r-F8UoAYsTaWDz2aSg&usqp=CAU',
        title: 'Task',
        description: 'Task description'
      },
      {
        color: '#952175',
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Task',
        description: 'Task description'
      }
    ]
  }),
  components: {
    TaskEdit
  },
  methods: {
    closeForm () {
      this.dialog = false
    }
  }
}
</script>
