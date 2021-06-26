<template>
  <div>
    <form>
      <label>
        <p>Excel dosya</p>
        <input type="file" :onchange="changeExcelFile"/>
      </label>
      <label>
        <p>Json dosya</p>
        <input type="file" :onchange="changeJsonFile"/>
      </label>
    </form>
    <div v-if="isExcelUploaded">
      <div>
        Filtrele
        <div v-for="(title, index) in excelTitles" :key="index">
          {{title}} :
          <select  :data-filter-index="index" :onchange="filterChange">
            <option
                v-for="(item, selectIndex) in itemsInExcelIndex(index)"
                :key="selectIndex"
                :value="item"
            >{{item}}</option>
          </select>
        </div>
      </div>
    </div>
    <div>
      <button :onclick="downloadNewJsonFile">
        Yeni json dosyasini indir
      </button>
    </div>
    <div v-if="this.filters.length > 0">
      Filtre
      {{JSON.stringify(this.filters)}}
    </div>
    <div v-if="isExcelUploaded">
      <table>
        <tr v-for="(row, rowIndex) in filteredExcelData" :key="rowIndex">
          <td v-for="(column, colIndex) in row" :key="colIndex">
            {{column}}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import readXlsxFile from 'read-excel-file'

export default {
  name: 'App',
  data() {
    return {
      excelRows: [],
      jsonFile: {},
      isExcelUploaded: false,
      isJsonFileUploaded: false,
      filters: [
          //object item
          //columnIndex -> column index
          //columnValue -> column value
      ],
      newJson: {}
    }
  },
  computed: {
    excelTitles: {
      get() {
        if (this.excelRows.length === 0) {
          return []
        }
        return this.excelRows[0].filter(item => item !== null)
      }
    },
    filteredExcelData: {
      get() {
        return this.excelRows.filter((row) =>
            this.filters.every(item => item.columnValue === row[item.columnIndex]) )
      }
    }
  },
  methods: {
    itemsInExcelIndex(index) {
      const items = this.excelRows.map(item => item[index])
      return new Set(items)
    },
    filterChange(e) {
      const columnValue = e.target.value
      const columnIndex =  e.target.getAttribute('data-filter-index')

      this.filters.push({
        columnIndex,
        columnValue
      })
    },
    updateNewJson() {
      this.filteredExcelData.forEach(item => {
        this.newJson = this.updateJsonValue(this.newJson, item[1], item[2])
      })
    },
    updateJsonValue (object, markedKey, newVal) {
      for (const [key, value] of Object.entries(object)) {
        if (typeof value !== 'string') {
          object[key] = this.updateJsonValue(value, markedKey, newVal)
        }else if (key === markedKey) {
          object[key] = newVal
        }
      }
      return object
    },
    changeExcelFile(e) {
      const file = e.target.files[0]

      readXlsxFile(file).then((rows) => {
        this.excelRows = rows
        this.isExcelUploaded = true
      }).catch(err => console.error(err))
    },
    downloadNewJsonFile() {
      this.updateNewJson()
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.newJson));
      const htmlEl = document.createElement('a');
      htmlEl.setAttribute("href", dataStr );
      htmlEl.setAttribute("download", "scene.json");
      htmlEl.click();
    },
    changeJsonFile(e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      const _ = this

      reader.onload  = function (e) {
        try {
          _.jsonFile = JSON.parse(e.currentTarget.result)
          _.isJsonFileUploaded = true
          _.newJson = _.jsonFile
        }catch (e) {
          console.error(e)
        }
      }

      reader.readAsText(file)
    }
  }
}
</script>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>