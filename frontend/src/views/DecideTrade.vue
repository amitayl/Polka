<template>
    <div>
        <div class="flex align-center space-between">
            <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                <v-card-media :src="products[0].imgs[0]" height="200px">
                </v-card-media>
                <v-card-title primary-title>
                    <div>
                    <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                    <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
                    </div>
                </v-card-title>
                <v-card-actions>
                    <!-- <v-btn flat color="orange">Share</v-btn>
                    <v-btn flat color="orange">Explore</v-btn> -->
                </v-card-actions>
                </v-card>
            </v-flex>
            </v-layout>
            <button class="button">Trade</button>

             <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                <v-card-media :src="products[1].imgs[0]" height="200px">
                </v-card-media>
                
                <v-card-title primary-title>
                    <div>
                       
                    <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                    <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
                         <img class="owner-img" :src="products[0].imgs[0]" height="200px">
                    </div>
                </v-card-title>
                <v-card-actions>
                    <!-- <v-btn flat color="orange">Share</v-btn>
                    <v-btn flat color="orange">Explore</v-btn> -->
                </v-card-actions>
                </v-card>
            </v-flex>
            </v-layout>
        </div>

      
    </div>
</template>

<script>
export default {
    created(){
        let idsStr = req.params.query;
        console.log ('idsStr' ,idsStr ); 
    },
    data (){
        return {
            products:[{
                title:'',
                imgs:['https://vuetifyjs.com/static/doc-images/cards/desert.jpg'
                ]
            },{
               title:'',
                imgs:['http://assets.storaenso.com/se/buildingandliving/Product-Image-Library/Building-systems-by-Stora-Enso.jpg?RenditionID=8.jpg'
                ]  
            }]
        }
    }

}
</script>


<style>
.owner-img{
    border-radius:20%;
}

.button{
    width:100px;
}

</style>
