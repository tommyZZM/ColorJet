/**
 * Created by tommyZZM on 2015/5/23.
 */
module game {
    export class ColourPower extends Entity {
        public velocitystatic = true;

        public haseaten:boolean;

        public constructor(){
            super();
            //TODO:∂‘œÛ≥ÿ
            this._display = new canvas.graphic.Circle(10,alcedo.core(ColourTransformManager).birdsmokecolour);
            this._body = new SAT.Circle(new SAT.Vector(0,0),10);
        }
    }
}