<template>
    <section class="product-preview">
            <!-- <img :src="product.imgs[0]" alt=""/>
            <div class="info-container">
                <div class="flex space-between info-heading-container">
                    <h2 class="md-title">{{product.title}}</h2>
                    <span class="md-subheading">{{product.location}}</span>
                </div>
                {{product.desc}}
            </div> -->

            <md-card class="md-card-example">
      <md-card-area md-inset>
        <md-card-media md-ratio="4:3">
          <img :src="product.imgs[0]" >
        </md-card-media>

        <md-card-header>
          <h2 class="md-title">{{product.title}}</h2>
          <div class="md-subhead">
            <md-icon>location_on</md-icon>
            <span>{{product.location}}</span>
          </div>
        </md-card-header>
             <p class="md-title">
               Desired in exchange:
               {{product.desiredSwapCategories[0]}} 
              </p>
      </md-card-area>

      <md-card-actions>
        <md-button class="md-primary">Make Offer</md-button>
      </md-card-actions>
    </md-card>

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
.md-card-actions.md-alignment-right {
  justify-content:center;
}

.product-preview {
  border: 1px solid  lightgray;
  width: 250px;
  height: 100%;
  max-height: 100%;
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
