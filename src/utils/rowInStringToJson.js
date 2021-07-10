// eslint-disable-next-line no-unused-vars
const recursiveArrayItemsToJson = (arr, changedRow, extObj) => {
    let thisObj = {} // geri donulecek obje olustur

    if(typeof extObj !== 'undefined') {
        thisObj = extObj //disaridan ayni derinlikte daha onceden obje olusturulmus ise onun uzerine yazmak yerine birlestirilip yeni obje olarak don
    }
    let objName = arr[0][0] // key i al

    if (arr[0].length === 1) { // keys arrayi son bir eleman kalmis ise sonlandir
        thisObj[objName] = arr[changedRow] // son olarak key value ikilisi olarak geri don
        return thisObj
    }
    arr[0].shift() // kullanilan keyi sil

    thisObj[objName] = recursiveArrayItemsToJson(arr, changedRow, thisObj[objName]) // ayni isleme devam et

    return thisObj // geri islenmis objeyi don
}

const rowsMap = (rows, changedRow) => {
   let thisObj = {}

    rows.forEach(i => { //exceldeki tum satilari dolas
        i[0] = i[0].split('.') // ilk elemani . noktalardan bol ic ice json olusturulmasi icin
        const objName = i[0][0] // kolonlarin ilkinin ilki json un keyini olusturur
        i[0].shift() // json key olarak kullanilan elemani sil
        thisObj[objName] = recursiveArrayItemsToJson(i ,changedRow, thisObj[objName]) // rekürsif olarak bu isleme devam et
    })

    return thisObj
}

const rowInStringToJson = (rows, changedRow) => {
    rows.shift() // exceldeki ilk satiri sil
    let result = {}

    try {
        result = rowsMap(rows, changedRow)
    }catch (e) {
        alert('Islem Sirasinda hata olustu. Excel iceriginin json yapisina uygunlugunu kontrol edermisiniz')
    }

    return result
}


export default rowInStringToJson