<template>
    <div class="md-feature-bullets">
        <ul class="delivery-bullets">
            <li v-if="product.bullet_one">{{product.bullet_one}}</li>
            <li v-if="product.bullet_two">{{product.bullet_two}}</li>
            <li v-if="product.bullet_three">{{product.bullet_three}}</li>
        </ul>
    </div>
</template>

<script>
    import { SfImage } from '@storefront-ui/vue';
    export default {
        name: 'AQuantityInfo',
        components: { SfImage },
        props: {
            product: {
                type: Object,
                required: true,
                default: () => ({})
            }
        }
    };
</script>

<style lang="scss" scoped>
    .quantity-info{
        padding-bottom: 7px;
        margin: 7px 0;
        border-bottom: 1px solid var(--c-light);
        .d-flex{
            margin-bottom: 7px; 
        }
        .sf-image{
            width: 21px;
            height: 21px;
            object-fit:contain;
            margin-right: 10px;
        }
        p{
            font-size: 12px;
            margin: 0;
        }
    }
</style>