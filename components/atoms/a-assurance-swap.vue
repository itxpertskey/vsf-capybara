<template>
    <div class="d-flex align-center">
     <SfImage
      src="/assets/icons/swap-icon.png"
      class="image_swap"
    />
    <div class="text-center">
        <h6>Guaranteed Products</h6>
        <p>Number 1 European Network</p>
    </div>
    </div>
</template>

<script>
import { SfImage } from '@storefront-ui/vue';
export default { components: { SfImage } };
</script>

<style lang='scss' scoped >
    .sf-image{
        width: 70px;
    }
</style>