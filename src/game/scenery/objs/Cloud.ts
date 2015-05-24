/**
 * Created by tommyZZM on 2015/5/22.
 */
module game{
    export class Cloud extends Entity{
        public velocitystatic= true;

        private _cloud:any

        public constructor(width:number,height:number){
            super(new canvas.DisplatObjectContainer());
            this.display.alpha = 0.8;
            this._cloud = new canvas.graphic.Rectangle(width,height);
            this.display.addChild(this._cloud);
            this.display.width = this._cloud.width;
            this.display.height = this._cloud.height;

            this._body = (new sat.Box(new sat.Vector(0,0),this.display.width
                ,this.display.height)).toPolygon();

            this.disactive();
        }

        public active(){
            //trace("active");
            this._cloud.fillcolour = "#f1c40f";
        }

        public disactive(){
            this._cloud.fillcolour = "#3498db";
        }
    }
}