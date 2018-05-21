<template>
    <section class="side-menu">
        <aside class="side-menu-menu">
            <link-list :isMobile="isMobile"></link-list>
        </aside>
    </section>
</template>

<script>
import LinkList from './app-header/LinkList.vue';

export default {
  props: ['isMobile'],
  components: {
    LinkList
  }
};
</script>

<style scoped>
.side-menu {
  position: fixed;
  z-index: 3;
  left: 0;
  top: 64px;
  bottom: 0;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-top: 1px solid lightgray;
  background: white;
}
</style>
