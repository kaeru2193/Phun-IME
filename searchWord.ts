let requestURL = './dict/IMEDict.json';//jsonへのパス
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

let IMEDict: []
// JSONデータをJavaScriptオブジェクトに変換
request.onload = async function() {
    const data = request.response;
    IMEDict = JSON.parse(JSON.stringify(data));
}

export function searchDict(search: string) {
    const filted = IMEDict.filter((e: any) => {
        return search.startsWith(e.pron)
    }).sort((a: any, b: any) => {return b.pron.length - a.pron.length})

    return filted
}