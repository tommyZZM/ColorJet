/**
 * Created by tommyZZM on 2015/5/27.
 */
module game{
    export class SmokeParticle extends alcedo.canvas.Particle{
        protected oncreate(x:number,y:number,mass:number=1){
            this._colour = alcedo.core(ColourTransformManager).birdsmokecolour;
            this.alpha = 0;
            this.scale.reset(0.6,0.2);
        }

        private _colour:string;
        protected display(renderer:canvas.CanvasRenderer){
            var context = renderer.context;
            context.beginPath();
            context.arc(0, 0, 6, 0, 2 * Math.PI, false);
            context.fillStyle = this._colour;
            context.fill();
        }

        protected prebron():boolean{
            this.scale.x+=0.05;
            this.scale.y+=0.05;
            if(this.alpha<1){
                this.alpha+=0.1;
            }else{
                this.alpha=1;
                return true;
            }
        }

        protected decaying():boolean{
            this.alpha-=0.01;
            this.scale.x+=0.06;
            this.scale.y+=0.06;
            if(this.alpha<0){
                this.alpha=0;
                return true;
            }
        }
    }
}