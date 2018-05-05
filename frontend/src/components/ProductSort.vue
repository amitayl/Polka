<template>
    <section class="product-sort flex justify-end">
        <md-button @click.native="toggleFilters()">sortBy &</md-button>
        <ul class="sort-opts" v-show="showFilters">
            <li v-for="(sortOpt, idx) in sortOpts" :key="idx">
                <md-button>
                    {{sortOpt}}
                </md-button>
            </li>
        </ul> 
    </section>
</template>

<script>
export default {
    data() {
        return {
            sortOpts: ['distance', 'feedback'],
            showFilters: false
        }
    },
    methods: {
        toggleFilters() {
            this.showFilters = !this.showFilters
        }
    }
}
</script>

<style scoped>
.product-sort {
    position: relative;
    padding: 0 20px;
}

.sort-opts {
    position: absolute;
    bottom: -100px;
    display: flex;
    flex-direction: column;
    background: whitesmoke;
}
</style>
