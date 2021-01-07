<template>
    <div class="d-flex align-center">
        <SfImage
        src="/assets/icons/delivery-icon.png"
        class="image_delivery"
        />
        <div class="text-center">
            <h6>Free Delivery </h6>
            <p>on Order Over £50e</p>
        </div>
    </div>
</template>

<script>
import { SfImage } from '@storefront-ui/vue';
export default { components: { SfImage } };
</script>