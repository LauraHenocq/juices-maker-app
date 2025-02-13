<template>
  <h1 class="title">
    <slot />
  </h1>
</template>
<style scoped lang="scss">
.title {
  position: relative;
  letter-spacing: 5px;
  text-align: center;
  background: linear-gradient(90deg, $secondary 0%, $primary 100%);
  background-clip: initial;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
  
.title::before {
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 30%;
  height: 60px;
  animation-name: slideinleft;
  animation-duration: 1s;
}
  
.title::after {
  position: absolute;
  bottom: -10px;
  right: 40px;
  width: 30%;
  height: 60px;
  display: inline-block;
  content: '';
  background-image: url('@/assets/icons/logo.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
  animation-name: slideinright;
  animation-duration: 1s;
}
  
@keyframes slideinleft {
  from {
    left: -250px;
  }
}
@keyframes slideinright {
  from {
    right: -250px;
  }
}
  
@media screen and (max-width: 768px) {
  .title {
    padding: 24px 12px;
    margin: 45px 0;
    font-size: 18px;
  }
  
  .title::after {
    bottom: -40px;
    right: 150px;
    width: 20%;
    height: 40px;
  }
}
</style>
  