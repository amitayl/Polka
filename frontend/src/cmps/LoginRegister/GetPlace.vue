

<template>
<section class="place">
<label >
  <input ref="autocomplete"  placeholder="City"   class=" text-box search-location"   onfocus="value = ''"  type="text" />
 
</label>

</section>
</template>

<script>
export default {
  data() {
    return {
      loc: {
        name,
        coords: {
          lat: null,
          lng: null
        }
      }
    };
  },
  mounted() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.$refs.autocomplete,
      { types: ["geocode"] }
    );
    this.autocomplete.addListener('place_changed', () => {
      let place = this.autocomplete.getPlace();
      let ac = place.address_components;
      this.loc.coords.lat = place.geometry.location.lat();
      this.loc.coords.lat = place.geometry.location.lng();
      this.loc.name = ac[0]["short_name"];
      
      console.log(
        `The user picked ${this.loc.name} with the coordinates`
      );
      this.emit();
    });
  },
  methods: {
    emit(){
      this.$emit ('selectedPlace', this.loc)
    }
   
  }
};
</script>

<style scoped>
.text-box {
  /* margin-left:10px; */
  margin-bottom:20px;
  outline: 0;
  height: 30px;
  width: 240px;
  font-size: 16px;
  line-height: 30px;
  padding: 0 16px;
   background-color: rgba(255, 255, 255, 0.8);
  color: #212121;
  border: 0;
 
  -webkit-border-radius: 4px 0 0 4px;
 
}
.text-box:focus {
  outline: 0;
  background-color: #fff;
}
.button {
  outline: 0;
  background: none;
  background-color: rgba(38, 50, 56, 0.8);
  float: left;
  height: 30px;
  width: 60px;
  padding: 0 10px;
  text-align: center;
  line-height: 30px;
  border: 0;
  color: #fff;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: 16px;
  text-rendering: auto;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  -webkit-transition: background-color 0.4s ease;
  transition: background-color 0.4s ease;
  -webkit-border-radius: 0 4px 4px 0;
  border-radius: 0 4px 4px 0;
}
.button:hover {
  background-color: rgba(0, 150, 136, 0.8);
}

button:hover {
  background-color: rgb(26, 139, 87);
}

button:focus {
  outline: 0;
}

.place {
  font-size:18px;
  width: 100%;
  margin-left: 0px;
  text-align:left;
  margin-right:180px;
}
label {
  width: 100%;
}
.search-location {
  /* display: inline-block;
  /* width: 60vw; */
  /* margin: 0 auto;
  margin-top: 5vw;
  font-size: 20px;
  font-weight: 400;
  outline: none;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 10px; */
}
</style>
