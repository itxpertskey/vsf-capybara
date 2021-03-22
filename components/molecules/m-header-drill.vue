<template>
  <div class="avis-banner">
    <div class="avis-background" />
    <p class="text_upper">
     Specialized in DIY and gardening tools
    </p>
  </div>
</template>
<script>

 
export default {
  data () {
    return {
      title: '',
      subtitle: 'We are specialized in DIY and gardening tools',
      description:
        '',
      buttonText: '',
      image: {
        mobile: '/assets/images/icon_drill.png',
        desktop: '/assets/images/icon_drill.png'
      }
    };
  }
};

</script>
<style  lang="scss" scoped>
  .text_upper
  {
    height: 42px;
    width: 196px;
    color: #FFFFFF;
    font-family: 'Poppins-Medium';
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0;
  }

</style>
