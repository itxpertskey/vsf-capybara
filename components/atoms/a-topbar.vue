<template>
  <div class="top-bar">
    <ul class="d-flex" id="md_top_comfort_links">
      <li>
        <a href="/pages/our-promise" class="md-opjjpmhoiojifppkkcdabiobhakljdgm_doc"
          >Our Promise</a
        >
      </li>
      <li>
        <a href="/pages/delivery" class="md-opjjpmhoiojifppkkcdabiobhakljdgm_doc"
          >Free Delivery</a
        >
      </li>
      <li>
        <a href="/pages/expert-advice" class="md-opjjpmhoiojifppkkcdabiobhakljdgm_doc"
          >Expert Advice</a
        >
      </li>
      <li class="last">
        <a href="/pages/returns" class="md-opjjpmhoiojifppkkcdabiobhakljdgm_doc"
          >30 Day Returns</a
        >
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.top-bar {
  ul {
    padding: 3px 30px;
    margin: 0;
    list-style: none;
    background-color: var(--_c-green-primary);
    @media screen and (max-width: 480px) {
      padding: 5px;
    }
    li {
      margin: 0 10px;
      @media screen and (max-width: 480px) {
        margin: 6px;
      }
      a {
        color: var(--c-white);
        font-size: 12px;
        @media screen and (max-width: 480px) {
          font-size: 11px;
        }
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>