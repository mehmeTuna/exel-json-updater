<template>
  <div class="mt-4">
    <Header />
    <DataFiltering />
    <ExcelTable />
  </div>
</template>

<script>
import Header from "@/components/Header";
import DataFiltering from "@/components/DataFiltering";
import ExcelTable from "@/components/ExcelTable";

export default {
  name: 'App',
  components: {ExcelTable, DataFiltering, Header}
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