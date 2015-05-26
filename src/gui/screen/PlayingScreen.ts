/**
 * Created by tommyZZM on 2015/5/18.
 */
module game {
    export class PlayingScreen extends GUIScreen {

        private _score:ScoreLabel;

        public startUp(){
            this._score = new game.ScoreLabel(this._ele.find(".score")[0])
            this._score.ele.css({top:alcedo.px(-100)});
        }

        public show(){
            trace("play screen show");
            stage.addEventListener(canvas.TouchEvent.TOUCH_BEGIN,this.ontapBegin,this);
            stage.addEventListener(canvas.TouchEvent.TOUCH_END,this.ontapEnd,this);
            TweenMax.to(this._score.ele.node,0.5,{delay:2,top:0});
        }

        public hide(callback){
            TweenMax.to(this._score.ele.node,0.5,{top:alcedo.px(-100),onComplete:()=>{
                stage.removeEventListener(canvas.TouchEvent.TOUCH_BEGIN,this.ontapBegin,this);
                stage.removeEventListener(canvas.TouchEvent.TOUCH_END,this.ontapEnd,this);
                if(callback)callback();
                trace("here");
            }});
        }

        private ontapBegin(){
            //trace("hi");
            alcedo.dispatchCmd(GameControl,GameControl.CTR_FLY_BEGIN)
        }

        private ontapEnd(){
            alcedo.dispatchCmd(GameControl,GameControl.CTR_FLY_RELEASE)
        }
    }
}