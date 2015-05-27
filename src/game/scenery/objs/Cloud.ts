/**
 * Created by tommyZZM on 2015/5/22.
 */
module game{
    import TextureRepository = alcedo.canvas.TextureRepository;

    export class Cloud extends Entity{
        public velocitystatic= true;

        private _cloud:any
        private _clouddebug:any

        public constructor(width:number,height:number){
            super(new canvas.DisplatObjectContainer());
            this._cloud = new canvas.Sprite((<TextureRepository>alcedo.core(TextureRepository)).get("darkcloud"));
            this._cloud.width = width;
            this._cloud.height = height;
            this._cloud.texture._textureWidth = width;
            this._cloud.texture._textureHeight = height;

            this.display.addChild(this._cloud);

            this._clouddebug = new canvas.graphic.Rectangle(width,height);
            this.display.addChild(this._clouddebug);
            this.display.width = this._clouddebug.width;
            this.display.height = this._clouddebug.height;
            this._clouddebug.alpha = 0.2;

            this._body = (new sat.Box(new sat.Vector(0,0),this.display.width
                ,this.display.height)).toPolygon();

            this.disactive();
        }

        public active(){
            this._clouddebug.fillcolour = "#f1c40f";
        }

        public disactive(){
            this._clouddebug.fillcolour = "#3498db";
        }
    }
}