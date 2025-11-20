let saveEl = document.getElementById("save-el")
let countEl = document.getElementById("count-el")
let count = 0
let saveCount = 0

function increment() {
    count += 1
    countEl.textContent = count
}

function save() {
    if (saveCount == 0) {
        saveEl.textContent += " " + count
    } else {
        saveEl.textContent += " - " + count
    }
    countEl.textContent = 0
    count = 0
    saveCount++
}
