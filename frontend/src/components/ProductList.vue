<template>
    <section class="product-list">
        <ul>
            <li v-for="product in products" :key="product._id">
                {{product}}
                <!-- <img :src="" alt=""> -->
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    props: {
        'products': {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
ul li {
    border: 1px solid black;
}
</style>
