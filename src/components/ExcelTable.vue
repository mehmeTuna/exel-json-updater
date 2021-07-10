<template>
  <table class="table mt-4">
    <thead>
    <tr>
      <th scope="col" v-for="(row, index) in excelTitles" :key="index" @click="changeRow(index)">{{row}}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(row, index) in filteredExcel" :key="index">
      <th scope="row" v-for="(col, index) in row" :key="index">{{col}}</th>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ExcelTable",
  computed: {
    ...mapGetters({
      excelTitles: 'excelTitles',
      filteredExcel: 'filteredExcel'
    })
  },
  methods: {
    ...mapActions({
      changeRow: 'changeRow'
    })
  }
}
</script>

<style scoped>

</style>