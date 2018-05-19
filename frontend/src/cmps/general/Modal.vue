<template>
    <section class="modal-background" @click="$emit('hideModal')">
        <div class="modal" @click.stop>
            <slot></slot>
        </div>
    </section>
</template>

<script>
export default {
};
</script>

<style scoped>
.modal-background {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, .5);
}

.modal {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 15px;
}
</style>