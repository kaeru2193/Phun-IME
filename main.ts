import { searchDict } from "./searchWord.js";

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

const marks: any = {
    ".": "。",
    ",": "、",
    "!": "！",
    "?": "？",
    " ": " ",
}

let pronInput: HTMLInputElement = <HTMLInputElement> document.getElementById("pron")
let suggestBox = document.getElementById("suggest")
let outputBox: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("output")
let message = document.getElementById("message")
let copyButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("copy")

let suggestObj: any[] = []

pronInput!.addEventListener("input", () => {
    if (numbers.includes(pronInput!.value.slice(-1))) {
        pronInput!.value = pronInput!.value.slice(0, -1)
    }

    if (marks.hasOwnProperty(pronInput!.value)) {
        outputBox!.value += marks[pronInput!.value]
        pronInput!.value = ""
    }

    suggestObj = searchDict(pronInput.value)

    const boxHTML = suggestObj.reduce((a, b, idx) => {
        return a + `<span class="suggestIndex">${(idx + 1) % 10}.</span><a href="javascript:void(0)" class="suggestWord" data="${idx}">${b.word}</a> `
    }, "")

    suggestBox!.innerHTML = boxHTML
})

document.addEventListener('keypress', (e) => {
	if (numbers.includes(e.key)) {
        const selectedID = (Number(e.key) + 9) % 10

        if (selectedID < suggestObj.length) {
            const length = suggestObj[selectedID].pron.length
            pronInput!.value = pronInput!.value.slice(length)

            outputBox!.value += suggestObj[selectedID].word
        }
    }
	return false; 
});

document.onkeydown = (e) => {
    const focus = document.activeElement

    if (e.key === "Backspace" && pronInput!.value.length == 0 && focus === pronInput) {
        outputBox!.value = outputBox!.value.slice(0, -1)
    } else if (e.key === "Enter" && pronInput!.value.length == 0 && focus === pronInput) {
        outputBox!.value += "\n"
    }
}

copyButton!.addEventListener("click", () => {
    if (navigator.clipboard) { // navigator.clipboardが使えるか判定する
        return navigator.clipboard.writeText(outputBox.value).then(function () { // クリップボードへ書きむ
          messageActive() //メッセージを表示する
        })
      } else {
        outputBox.select() // inputタグを選択する
        document.execCommand('copy') // クリップボードにコピーする
        messageActive() //メッセージを表示する
      }
})

function messageActive() {
    message!.classList.remove('hideMessage')

    setTimeout(() => {
        message!.classList.add('hideMessage')
    }, 2000)
}