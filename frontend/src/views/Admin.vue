<template>
  <section class="admin container">

    <v-data-table v-if="users"
      :headers="headers"
      :items="users"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td><img class="user-img" :src="props.item.img"></td>
        <td class="text-xs-right">{{props.item.nickName}}</td>
        <td class="text-xs-right">{{props.item.createdAt}}</td>
        <td class="text-xs-right">{{props.item.email}}</td>
        <td class="text-xs-right">{{props.item.password}}</td>
        <td class="text-xs-right">{{props.item.desc}}</td>
        <td class="text-xs-right">
          <v-btn @click="deleteUser(user._id, idx)" class="red lighten-3">X</v-btn>
        </td>
      </template>
    </v-data-table>
  </section>
</template>

<script>
import UserService from '../services/UserService.js';

export default {
  name: 'admin',
  created() {
    UserService.query().then(users => {
      this.users = users;
    });
  },

  data() {
    return {
      users: null,
      headers: [
        {
          text: 'img',
          // align: 'left',
          // sortable: false,
          value: 'img'
        },
        { text: 'name', value: 'name' },
        { text: 'created at', value: 'createdAt' },
        { text: 'email', value: 'email' },
        { text: 'password', value: 'password' },
        { text: 'description', value: 'description' },
        { text: 'actions', value: 'actions' }
      ]
    };
  },
  methods: {
    deleteUser(userId, idx) {
      UserService.remove(userId).then(() => {
        this.users.splice(idx, 1);
      });
    }
  }
};
</script>