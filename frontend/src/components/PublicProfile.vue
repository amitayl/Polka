<template>

    
    <section class="public-profile">
        <div class= "user-img-line flex user-details   ">
             <div class="user-img-wrapper"> <img class="user-img"  src="../imgs/selectedUser.jpg"></div>
             <div  class="flex details flex-column">
                <h2 class="user-title title is-1">{{user.name}} </h2>
                <br>
                <br>    
                <h4 class="user-desc title is-4">{{user.desc}} bla bla la bla bla </h4>
                <h4 class="user-desc title is-4">yosi@gmail.com </h4>
                <h4 class="user-desc title is-4">Haifa, Sderot Moshe</h4>
                   
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    created (){
    }
};

</script>

<style scoped>
.public-profile{
    text-align:left;
}
.user-details{
    padding:5px;
}

.user-title{
    font-family: "Times New Roman", Times, serif;
}

.user-img-wrapper{
    
     margin-right:50px;
    width:200px;
}
      
.user-img{
    box-shadow: 0 2px 2px black;
    border-radius: 50%;
}


</style>
