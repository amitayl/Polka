<template>
  <section class="admin container">
    <md-table>
      <md-table-row>
        <md-table-head>img</md-table-head>
        <md-table-head>name</md-table-head>
        <md-table-head>created at</md-table-head>
        <md-table-head>email</md-table-head>
        <md-table-head>password</md-table-head>
        <md-table-head>description</md-table-head>
        <md-table-head>actions</md-table-head>
      </md-table-row>

      <md-table-row v-for="(user, idx) in users" :key="idx">
        <md-table-cell>
          <img class="user-img" :src="user.img">
        </md-table-cell>
        <md-table-cell>{{user.nickName}}</md-table-cell>
        <md-table-cell>{{user.createdAt}}</md-table-cell>
        <md-table-cell>{{user.email}}</md-table-cell>
        <md-table-cell>{{user.password}}</md-table-cell>
        <md-table-cell>{{user.desc}}</md-table-cell>
        <md-table-cell>
          <button @click="deleteUser(user._id, idx)" class="button is-danger">X</button>
        </md-table-cell>
      </md-table-row>

    </md-table>
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
      users: null
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

<style>
.user-img {
  height: 50px;
  width: 50px;
}

.admin tr {
  vertical-align: middle;
}
</style>
