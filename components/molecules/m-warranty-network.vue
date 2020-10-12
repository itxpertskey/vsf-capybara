<template>
    <div class="d-flex align-center">
        <div class="rectangle_warranty">
        <SfImage
            src="/assets/images/swap-europe-warranty.png"
            class="image_warranty"
            />
            <div class="rectangle_warranty_text"> 
                Our Warranty Network: SWAP

                At SWAP, we believe that it is always better to repair a tool than to throw it away..

                With our permanent stock of over 20,000 reference parts, compatible with most brands, SWAP, is the leading European parts stockist in DIY and gardening, extending the life of your machines whilst helping you save on cost. Lawn mower, electric drills, sanders ... keep all your tools for longer while saving money!

                Finally, and because the obsolescence of machines is not inevitable, SWAP helps you to get the best possible performance and long-term use of your products by monitoring their life cycles.

                From the servicing or installation of equipment such as an air conditioning unit or a wood stove, to the maintenance of your petrol tools (winter maintenance) through the replacement of a defective part or a repair, SWAP takes care of your tools!
            </div>
        </div>
    </div>
</template>

<script>
import { SfImage } from '@storefront-ui/vue';
export default { components: { SfImage } };
</script>
<style>
.rectangle_warranty {
  box-sizing: border-box;
  height: 344px;
  width: 1302px;
  border: 2px solid #E3E6EA;
  border-radius: 5px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.05);
  display:flex;
}
.image_warranty{
    margin-left: 51px;
}
.rectangle_warranty_text {
  height: 257px;
  width: 855px;
  color: #222222;
  font-family: Poppins;
  font-size: 13px;
  letter-spacing: 0;
  line-height: 20px;
  margin-left: 42px;
}
</style>