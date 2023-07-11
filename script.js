
const getAndUpdate = () => {
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = []
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr)
    }

    let str = ""
    let tableBody = document.getElementById('tableBody')
    itemJsonArray.forEach((element, index) => {
        str += `<tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="btn btn-sm btn-danger" onclick="deleted(${index})">Delete</button></td>
    </tr>`
    });
    tableBody.innerHTML = str
}

const update = () => {
    let tit = document.getElementById('title').value
    let desc = document.getElementById('description').value
    if (tit == "" && desc == "") {
        alert("Please enter title and Description...")
    }
    else {

        if (localStorage.getItem('itemsJson') == null) {
            itemJsonArray = []
            itemJsonArray.push([tit, desc])
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
        }
        else {
            itemJsonArrayStr = localStorage.getItem('itemsJson')
            itemJsonArray = JSON.parse(itemJsonArrayStr)
            itemJsonArray.push([tit, desc])
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
        }
        let str = ""
        let tableBody = document.getElementById('tableBody')
        itemJsonArray.forEach((element, index) => {
            str += `<tr>
                        <th scope="row">${index + 1}</th>
                        <td>${element[0]}</td>
                        <td>${element[1]}</td>
                        <td><button class="btn btn-sm btn-danger" onclick="deleted(${index})">Delete</button></td>
                    </tr>`
        });
        tableBody.innerHTML = str
    }
    clearInputs()
    getAndUpdate()
}

const clearInputs = ()=>{
    document.getElementById('title').value = ""
    document.getElementById('description').value = ""
}

let add = document.getElementById('add')
add.addEventListener('click', update)
getAndUpdate()

function deleted(itemIndex) {
    console.log(itemIndex)
    itemJsonArray.splice(itemIndex, 1)
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    getAndUpdate()
}

const localclear = () => {
    if (JSON.parse(localStorage.getItem('itemsJson')).length > 0 ) {
        if (confirm("Do you really want to clear the list ?")) {
            localStorage.clear()
        }
    }
    clearInputs()
    getAndUpdate()
}
