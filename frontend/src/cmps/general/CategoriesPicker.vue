<template>
  <section class="categories-picker flex flex-wrap justify-center">

      <template v-if="display">
        <label 
          v-for="category in categories" 
          :key="category.title" 
          class="category display relative"
          :class="{small: small}"
          @mouseover="category.showTooltip = true"
          @mouseout="category.showTooltip = false">

        <i 
          class="fas" 
          :class="{['fa-'+category.className] : true}">
        </i>

        <p 
          class="tooltip body-1" 
          v-show="category.showTooltip">
          {{category.title}}
        </p>

      </label>
    </template>
    
    <template v-else>
      <label 
        v-for="category in categories" 
        :key="category.title" 
        class="category relative"
        @click="category.selected = !category.selected"
        @mouseover="category.showTooltip = true"
        @mouseout="category.showTooltip = false"
        :class="{'selected': category.selected}">

        <i 
          class="fas" 
          :class="{['fa-'+category.className] : true}">
        </i>

        <p 
          class="tooltip body-1" 
          v-show="category.showTooltip">
          {{category.title}}
        </p>

        <input 
          type="checkbox" 
          v-show="false" 
          @click.stop
          :value="category.value" 
          v-model="selectedCategories"/>

      </label>
    </template>
  </section>
</template>

<script>
export default {
  props: { 
    display: {}, 
    small: {
      default: true
    } 
  },
  created() {
    if (this.display) {
      this.categories = this.categories.filter(category => {
        return this.display.find(displayCategory => {
          return category.value === displayCategory;
        });
      });
    }
  },
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
  }
};
</script>

<style scoped>
.categories-picker {
  text-align: center;
}
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
.category.small {
  font-size: 22px;
}
.category.selected,
.category.display {
  background: whitesmoke;
  color: white;
  background-color: darkslategrey;
  border-color: transparent;
}
.category:hover {
  cursor: pointer;
}
.category.display:hover {
  cursor: initial;
}
.tooltip {
  position: absolute;
  z-index: 1;
  top: 65px;
  color: white;
  border-radius: 15px;
  padding: 0.25em 0.5em;
  background-color: darkslategrey;
}
.category.small .tooltip {
  top: 50px;
}
</style>
