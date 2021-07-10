<template>
  <div class="d-flex flex-row mt-4">
    <div class="card mx-4" style="width: 18rem;">
      <div class="card-body">
          <div class="d-flex justify-content-center align-items-center">
            <h4>Sayfa </h4>
            <select class="form-select" aria-label="Default select example" @change="selectSheet">
              <option disabled selected> Sec</option>
              <option v-for="(item, index) in sheets" :key="index" :value="item.name">{{ item.name }}</option>
            </select>
          </div>
      </div>
    </div>
    <div class="card mx-4" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Filtre</h5>
        <h6 class="card-subtitle mb-2 text-muted">Dosya Adi</h6>
        <p class="card-text"></p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "DataFiltering",
  computed: {
    ...mapGetters({
      sheets: 'sheets',
      excelRows: 'excelRows'
    })
  },
  methods: {
    ...mapActions({
      setSheet: 'setSheet'
    }),
    selectSheet(e){
      this.setSheet(e.target.value)
    },
    groupExcelKeys(rows) {
      const tempKeys = Array.from(new Set(rows.map(item => item[0].split('.')[0])))
      let tempArrays = []

      tempKeys.forEach(() => {
        tempArrays.push([])
      })

      rows.forEach(item => {
        const key = item[0].split('.')[0]
        const index = tempKeys.indexOf(key)
        tempArrays[index].push(item)
      })

      return tempArrays
    },
    rowsToJson(row) {
      console.log(row)
    },
    keyParse(){

    },
    deneme() {

      const filteredExcelRows = this.excelRows.filter(item => item[1]?.length > 0 && item[2]?.length > 0 && item[3]?.length > 0 && item[4]?.length > 0)

      const groupedExcelKeys = this.groupExcelKeys(filteredExcelRows)
      console.log('groupedExcelKeys', groupedExcelKeys)

      this.rowsToJson(groupedExcelKeys)
    }
  },
}
</script>

<style scoped>

</style>