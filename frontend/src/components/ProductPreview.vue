<template>
    <section class="product-preview">
        <router-link to="/browseProducts">
            <img :src="product.imgs[0]" alt=""/>
            <div class="info-container">
                <div class="flex space-between info-heading-container">
                    <h2 class="md-title">Product Title</h2>
                    <span class="md-subheading">{{product.location}}</span>
                </div>
                {{product.desc}}
                
            </div>
        </router-link> 
    </section>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    }
};
</script>

<style scoped>
.product-preview {
  border: 1px solid black;
  width: 250px;
  text-align: left;
  transition: box-shadow 0.3s;
}

.product-preview:hover {
  cursor: pointer;
  box-shadow: 2px 2px 15px lightgray;
}

.product-preview:last-of-type {
  margin-right: 0;
}

.product-preview img {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
}
.info-container {
  padding: 10px 20px;
}
.info-heading-container {
  margin-bottom: 10px;
}
</style>
