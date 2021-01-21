<template>
    <div class="d-flex align-center">
         <SfLink link="/pages/delivery">  
            <SfImage
            src="/assets/icons/delivery-icon.png"
            class="image_delivery"
            />
            <div class="text-center">
                <h6>Free Delivery </h6>
                <p>on Order Over £50</p>
            </div>
        </SfLink>
    </div>
</template>

<script>
import { SfImage, SfLink } from '@storefront-ui/vue';
export default { components: { SfImage, SfLink } };
</script>