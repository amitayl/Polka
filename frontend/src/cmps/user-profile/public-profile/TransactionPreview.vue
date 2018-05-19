<template>    
    <section class="transaction-preview pa-2 flex 
                    space-around align-center" 
             @click="$router.push('/transaction/'+transaction._id)">

        <div class="img-txt-container flex flex-column flex-center">
            <v-avatar :size="50" class="mb-1">
                <img :src="thisUser.product.imgs[0]">
            </v-avatar>
            {{thisUser.product.title.substr(0, 12)}}
        </div>

        <i class="handshake-logo far fa-handshake"></i> 

        <div class="img-txt-container flex flex-column flex-center">
            <v-avatar :size="50" class="mb-1">
                <img :src="otherUser.product.imgs[0]">
            </v-avatar>
            {{otherUser.product.title.substr(0, 12)}}
        </div>

    </section>
</template>

<script>
export default {
    props: {
        transaction: {
            type: Object,
            required: true
        }
    },
    created() {
        const userId = this.$route.params._id;
        if (userId === this.transaction.owner._id) {
            this.thisUser = this.transaction.owner;
            this.otherUser = this.transaction.bidder;           
        } else {
            this.thisUser = this.transaction.bidder;
            this.otherUser = this.transaction.owner;
        }
    },
    data() {
        return {
            thisUser: null,
            otherUser: null
        }
    }
};
</script>

<style scoped>
.transaction-preview {
    color: darkslategrey;
    transition: .3s;
}
.transaction-preview:hover {
    cursor: pointer;
        box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),
        0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)!important;
}
.img-txt-container {
    width: 50px;
}
.handshake-logo {
    font-size: 2.5em;
}
</style>