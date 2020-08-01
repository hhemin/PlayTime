<template>
  <div class="mebox">
    <div class="photo">
      <div class="myphoto"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'me'
}
</script>

<style lang="less">
.mebox {
  .photo {
    background-color: red;
    height: 10rem;
    width: 100%;
    .myphoto {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: yellow;
    }
  }
}
</style>
