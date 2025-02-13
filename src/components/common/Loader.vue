<template>
    <div class="cup" />
</template>
<style scoped lang="scss">
.cup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 40px;
    border: 2px solid #fff;
    border-radius: 5px 5px 15px 15px;
    background: url('@/assets/img/juice-wave.JPG') repeat-x;
    animation: waving 10s linear infinite;
    box-shadow: 0 0 0 2px $primary, 0 5px 10px rgba(0, 0, 0, 1);
}
  
.cup::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 20px;
    border: 2px solid $primary;
    right: -14px;
    top: 8px;
    border-top-right-radius: 35px;
    border-bottom-right-radius: 35px;
}
  
@keyframes waving {
    0% {
      background-position: 0px 0px;
    }
    10% {
      background-position: 0 50px;
    }
    40% {
      background-position: 1000px -20px;
    }
    80% {
      background-position: 2000px -40px;
    }
    100% {
      background-position: 2500px 100px;
    }
  }
  </style>
  