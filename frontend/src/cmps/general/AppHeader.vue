<template>
  <section v-if="!isHome" class="app-header">
    <v-toolbar :height="64" fixed color="white">
          
      <template v-if="isMobile">

        <search-form 
          v-if="showSearchInMobile"
          :isMobile="isMobile"
          @closeSearch="showSearchInMobile = false"
          @submit.native="showSearchInMobile = !showSearchInMobile">
        </search-form>

        <template v-else>

          <v-btn 
            @click.native="$emit('toggleSideMenu')"
            fab 
            flat>
            <v-icon>
              menu
            </v-icon>
          </v-btn>

          <div class="hover-pointer-container">
            <i class="far fa-handshake logo-icon"></i> 
            <v-toolbar-title 
              @click="moveTo('')" 
              class="display-1 logo"
              fixed>
                Polka
            </v-toolbar-title>
          </div>

          <v-btn 
            @click.native="showSearchInMobile = !showSearchInMobile"
            fab 
            flat>
            <v-icon 
              class="search-icon">
                search
            </v-icon>
          </v-btn>

        </template>

      </template>


      <template v-if="!isMobile">
        <div 
          class="hover-pointer-container" 
          @click="moveTo('')">
          <i class="far fa-handshake logo-icon"></i> 
          <v-toolbar-title 
            class="display-1 logo"
            fixed>
              Polka
          </v-toolbar-title>
        </div>

        <search-form 
          :isMobile="isMobile">
        </search-form>
        <link-list :isMobile="isMobile"></link-list>
      </template>

    </v-toolbar>
  </section>
</template>

<script>

import SearchForm from './app-header/SearchForm.vue';
import LinkList from './app-header/LinkList.vue';

export default {
  props: {
    isMobile: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      showSearchInMobile: false,
    };
  },
  computed: {
    isHome() {
      const route = this.$route.path;
      return route === '/';
    },
  },
  methods: {
    moveTo(route) {
      const prevRoute = this.$route.path;
      const nextRoute = '/' + route;

      if (prevRoute !== nextRoute) {
        this.$router.push(nextRoute);
      }
    },
  },
  components: {
    SearchForm,
    LinkList,
  }
};
</script>

<style>
.toolbar {
  z-index: 3;
}
.toolbar__content {
  justify-content: space-between;
}
@media (min-width: 900px) {
  .toolbar__content {
    justify-content: initial;
  }
}
@font-face {
  font-family: JosefinSans;
  src: url('../../../public/css/font/JosefinSans-Bold.ttf');
}

.hover-pointer-container {
  display: flex;
  align-items: center;
}
.hover-pointer-container:hover {
  cursor: pointer;
}

.logo,
.logo-icon {
  color: #64b5f6;
}
.logo {
  font-family: JosefinSans;
}
.logo-icon {
  font-size: 26px;
}
@media (min-width: 900px) {
  .logo {
    margin-right: 20px;
  }
  .logo-icon {
    font-size: 40px;
  }
}
.search-icon {
  transform: rotateY(180deg);
}
.search-form,
.search-form .search-form-form {
  height: inherit;
  width: 100%;
}
.search-form-form .search {
  flex-grow: 1;
}
.app-header .search-form .search-form-form,
.app-header .search-form .search-form-form select,
.app-header .search-form .search-form-form button[type='submit'] {
  border-radius: 0;
}
.search-form .search-form-form button[type='submit'] {
  min-width: 64px;
}
@media (min-width: 900px) {
  .search-form,
  .search-form .search-form-form {
    height: initial;
    width: initial;
  }
  .search-form-form .search {
    flex-grow: none;
  }
  .search-form .search-form-form {
    border-radius: 20px;
  }
  .search-form .search-form-form select {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  .search-form .search-form-form button[type='submit'] {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    min-width: initial;
  }
}
/* overriding vuetify classes */
.app-header .btn--floating {
  height: 40px;
  width: 40px;
}
</style>