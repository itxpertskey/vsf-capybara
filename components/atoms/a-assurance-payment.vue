<template>
    <div class="d-flex align-center">
         <SfLink link="/pages/payment-info">  
            <SfImage
            src="/assets/icons/payment-icon.png"
            class="image_payment"
            />
            <div class="text-center">
                <h6>100% Secure Payment</h6>
            </div>
        </SfLink>
    </div>
</template>

<script>
import { SfImage, SfLink } from '@storefront-ui/vue';
export default { components: { SfImage, SfLink } };
</script>