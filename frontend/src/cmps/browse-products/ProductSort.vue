<template>
    <section class="product-sort flex justify-end">
        <v-btn @click.native="showFilters = !showFilters">sortBy &</v-btn>
        <ul class="sort-opts" v-show="showFilters">
            <li v-for="(sortOpt, idx) in sortOpts" :key="idx">
                <v-btn flat>
                    {{sortOpt}}
                </v-btn>
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
}
</script>

<style scoped>
.product-sort {
    position: relative;
    padding: 0 20px;
}

.sort-opts {
    position: absolute;
    z-index: 1;
    bottom: -100px;
    display: flex;
    flex-direction: column;
    background: whitesmoke;
}
</style>
