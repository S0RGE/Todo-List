<template>
  <v-card>
    <v-list>
      <v-list-item-group v-model="model">
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
    <v-card-actions>
      <v-text-field label="Add Task List" width="90%"></v-text-field>
      <v-btn dark rounded>Ok</v-btn>
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
      model: 1
    }
  }
}
</script>
