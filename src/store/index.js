import { createStore } from "vuex";
import readXlsxFile from "read-excel-file";
import rowInStringToJson from "@/utils/rowInStringToJson";

const store = {
    state: {
        excelRows: [],
        isExcelUploaded: false,
        changedRow: null,
        sheet: null,
        sheets: [],
        file: null
    },
    actions: {
        changeSheet({commit}, file) {
            commit('setFile', file)
            readXlsxFile(file, { getSheets: true }).then((sheets) => {
                commit('setSheets', sheets)
            }).catch(err => console.error(err))
        },
        changeExcelFile({commit, state}) {
            readXlsxFile(state.file, { sheet: state.sheet }).then((rows) => {
                commit('setExcelRows', rows)
            }).catch(err => console.error(err))
        },
        changeRow({commit, state, dispatch}, data) {
            commit('changeRow', data)

            const fileName = state.excelRows[0][state.changedRow] // secili olan row un title ini verir
            state.excelRows = state.excelRows.filter(item => item[0]?.length > 0 && item[1]?.length > 0 && item[2]?.length > 0 && item[3]?.length > 0 && item[4]?.length > 0)
            const newArr = [...state.excelRows]
            const result = rowInStringToJson(newArr, state.changedRow)

            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result));
            const htmlEl = document.createElement('a');
            htmlEl.setAttribute("href", dataStr );
            htmlEl.setAttribute("download", `${fileName}.json`);
            htmlEl.click();

            dispatch('changeExcelFile')
        },
        setSheet({commit, dispatch}, data) {
            commit('setSheet', data)
            dispatch('changeExcelFile')
        }
    },
    mutations: {
        setExcelRows(state, rows) {
            state.excelRows = rows
            state.isExcelUploaded = true
        },
        changeRow(state, data) {
            state.changedRow = data
        },
        setSheets(state, sheets) {
            state.sheets =sheets
        },
        setSheet(state, sheet) {
            state.sheet =sheet
        },
        setFile(state, file) {
            state.file = file
        }
    },
    getters: {
        excelRows(state) {
            return state.excelRows.filter(item => item[1]?.length > 0 && item[2]?.length > 0 && item[3]?.length > 0 && item[4]?.length > 0)
        },
        excelTitles(state){
          return state.excelRows[0]
        },
        filteredExcel(state) {
            return state.excelRows.filter(item => item[1]?.length > 0 && item[2]?.length > 0 && item[3]?.length > 0 && item[4]?.length > 0)
        },
        sheets(state) {
            return state.sheets
        }
    }
}

export default createStore(store);
