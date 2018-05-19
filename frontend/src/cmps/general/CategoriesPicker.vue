<template>
  <section class="categories-picker flex flex-wrap justify-center">
      <label v-for="category in categories" 
             :key="category.title" 
             class="category relative"
             @click="category.selected = !category.selected"
             @mouseover="category.showTooltip = true"
             @mouseout="category.showTooltip = false"
             :class="{'selected': category.selected}">
          <!-- {{category.title}} -->

          <i class="fas" :class="{['fa-'+category.className] : true}"></i>

          <p class="tooltip body-1" v-show="category.showTooltip">{{category.title}}</p>

          <input type="checkbox" v-show="false" @click.stop
                 :value="category.value" v-model="selectedCategories">
      </label>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selectedCategories: [],
      categories: [
        {
          title: 'art',
          value: 'art',
          className: 'paint-brush',
          showTooltip: false,
          selected: false
        },
        {
          title: 'electronics',
          value: 'electronics',
          className: 'desktop',
          showTooltip: false,
          selected: false
        },
        {
          title: 'fashion',
          value: 'fashion',
          className: 'female',
          showTooltip: false,
          selected: false
        },
        {
          title: 'home & Garden',
          value: 'home',
          className: 'home',
          showTooltip: false,
          selected: false
        },
        {
          title: 'music',
          value: 'music',
          className: 'music',
          showTooltip: false,
          selected: false
        },
        {
          title: 'sports',
          value: 'sport',
          className: 'bicycle',
          showTooltip: false,
          selected: false
        }
      ]
    };
  },
  watch: {
    selectedCategories() {
      this.$emit('selectedCategories', this.selectedCategories);
    }
  },
};
</script>

<style scoped>
.category {
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: darkslategrey;
  border: 4px solid currentColor;
  font-size: 30px;
  height: 2em;
  width: 2em;
  border-radius: 50%;
}
.category.selected {
  background: whitesmoke;
  color: white;
  background-color: darkslategrey;
  border-color: transparent;
}
.category:hover {
  cursor: pointer;
}
.tooltip {
  color: white;
  border-radius: 15px;
  padding: .25em .5em;
  background-color: darkslategrey;
  position: absolute;
  top: 65px;
}
</style>
