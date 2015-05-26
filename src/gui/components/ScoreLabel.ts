/**
 * Created by tommyZZM on 2015/5/26.
 */
module game{
    export class ScoreLabel{
        private _ele:dom.DomElement;

        private _text:dom.DomElement;

        public constructor(ele){

            this._ele = ele;

            this._text = this._ele.find(".text")[0];
        }

        public get ele():dom.DomElement{
            return this._ele;
        }

        public set score(num:number){

        }
    }
}