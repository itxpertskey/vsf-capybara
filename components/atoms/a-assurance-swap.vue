<template>
    <div class="d-flex align-center">
        <SfImage
        src="/assets/icons/swap-icon.png"
        class="image_swap"
        />
        <div class="text-center">
            <h6>Guaranteed Products</h6>
            <SfLink link="https://services.swap-europe.com/marketplaces-services" target="_blank">
                <p>Number 1 European Network</p>
            </SfLink>
        </div>
    </div> 
</template>

<script>
import { SfImage, SfLink } from '@storefront-ui/vue';
export default { components: { SfImage, SfLink } };
</script>

<style lang='scss' scoped >
    .sf-image{
        width: 70px;
    }
</style>