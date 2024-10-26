<template>
  <styled-select 
    class="year-selector separated-caret"
    :options="options"
    :value="parseInt(year) || currentYear"
    @input="selected"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'year-select',
  computed: {
    options () {
      // adiciona o ano atual a lista de anos e ordena pra os anos aparecerem em ordem decrescente.
      const yearsWithCurrent = [this.currentYear, ...this.years.filter(year => year)];
      const sortedYears = yearsWithCurrent.sort((a, b) => b - a);
      return sortedYears.map((x) => { return { key: x, value: x } });
    },
    ...mapState({
      years: state => state.money.years,
      year: state => new Date().getFullYear()
    })
  },
  mounted () {
    this.getYears();
  },
  methods: {
    selected (year) {
      this.$router.push({ name: 'home', params: { year } });
    },
    ...mapActions([
      'getYears'
    ])
  },
}
</script>

<style lang="scss" scoped>
  .list-bare {
    z-index: 2000;
    border-top-width: calc(1px * calc(1 - 0));
    border-bottom-width: calc(1px * 0);
    width: 11rem;
  }
</style>