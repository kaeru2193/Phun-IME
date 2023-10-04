var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let requestURL = './dict/IMEDict.json'; //jsonへのパス
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
let IMEDict;
// JSONデータをJavaScriptオブジェクトに変換
request.onload = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const data = request.response;
        IMEDict = JSON.parse(JSON.stringify(data));
    });
};
export function searchDict(search) {
    const filted = IMEDict.filter((e) => {
        return search.startsWith(e.pron);
    }).sort((a, b) => { return b.pron.length - a.pron.length; });
    return filted;
}
