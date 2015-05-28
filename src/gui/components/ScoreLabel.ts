/**
 * Created by tommyZZM on 2015/5/26.
 */
module game{
    export class ScoreLabel{
        private _ele:dom.DomElement;

        private _text:dom.DomElement;
        private _letters:Array<any>;

        public constructor(ele){

            this._ele = ele;

            this._text = this._ele.find(".text")[0];

            this._letters = [];
            for(var i=0;i<7;i++){
                this._letters.push(dom.query("<div></div>")[0]);
            }
        }

        public get ele():dom.DomElement{
            return this._ele;
        }

        public set score(num:number){
            var str = num+"";

            this._text.hide();
            this._text.node.innerHTML = "";//removeChildren

            for(var i=0;i<str.length;i++){
                var letter = this._letters[i];
                if(!letter)continue;
                letter.node.className = "letter num"+str[i];
                this._text.appendChild(letter);
            }

            this._text.show();
        }
    }
}