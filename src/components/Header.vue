<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex flex-column mx-1">
        <h2>Excel Dosyasi Sec</h2>
        <input type="file" :onchange="changeExcel"/>
      </div>
      <div class="col d-flex mx-1 align-items-center">
        <button class="btn btn-primary">
          <p class="h3">Yeni Json Indir</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'Header',
  methods: {
    ...mapActions({
      changeSheet: 'changeSheet'
    }),
    changeExcel(e) {
      this.changeSheet(e.target.files[0])
    }
  },
}
</script>
