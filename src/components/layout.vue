<template>
  <div class="layout">
    <header-bar></header-bar>
    <slot name="content"></slot>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import HeaderBar from '@/components/header'
import FooterBar from '@/components/footer'
export default {
 components:{
    'HeaderBar': HeaderBar,
    'footerBar': FooterBar
  }
}
</script>

<style>
</style>