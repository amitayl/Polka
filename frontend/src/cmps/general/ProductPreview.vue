<template>
    <section class="product-preview">
      <v-layout style="height: 100%">
        <v-flex>
          <v-card width="100%">
            <v-card-media
              height="200px"
              :src="product.imgs[0]"
            >
            </v-card-media>
            <v-card-title>
              <div>
                <span class="headline">{{product.title}}</span><br>
                <span>{{product.location}}</span><br>
                <span>{{product.desc}}</span>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="orange">Bid now</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
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
  border: 1px solid lightgray;
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
