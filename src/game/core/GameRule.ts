/**
 * Created by tommyZZM on 2015/5/27.
 */
module game{
    /**
     * 游戏规则控制核心
     */
    export class GameRule extends alcedo.AppSubCore{
        public static HIT_CLOUD:string = "GameRule_Hit_Cloud";
        public static HIT_COLOUR:string = "GameRule_Hit_Colour";

        private _bird:JetBird;
        private _score:number;
        //private _birdlife:number = 3;

        public startUp(bird:JetBird){
            this._bird = bird;
            this._score = 0;

            this.addCmdHandler(GameRule.HIT_CLOUD,this.onHitCloud);
            this.addCmdHandler(GameRule.HIT_COLOUR,this.onHitColour);
            stage.addEventListener(alcedo.canvas.Stage.ENTER_MILLSECOND10,this.checkBird,this);
            alcedo.addDemandListener(GameState,GameState.PREPLAY,this.resetAll,this,1);
        }
        private resetAll(){
            this._score = 0;
            this._hitcout = 0;
            alcedo.core(GUICycler).getScreen("playing").setScore(this._score);
        }

        /**
         * 检查小鸟的位置，如果小鸟掉进云层游戏结束
         */
        private _checkdelay:number=0;
        private checkBird(){
            if(!alcedo.core(GameState).isplaying)return;
            //检测小鸟的位置
            if(this._bird.y>stage.height && this._bird.velocity.y>0){
                alcedo.dispatchCmd(GameState,GameState.OVER,{score:this._score});
            }

            this._checkdelay++;
            if(this._checkdelay>50){
                this._checkdelay=0;
                this._score+=1;
                alcedo.core(GUICycler).getScreen("playing").setScore(this._score);
            }
        }

        /**
         * 如果小鸟与云碰撞,游戏结束
         */
        private _hitcout:number;
        private onHitCloud(){
            if(!alcedo.core(GameState).isplaying)return;
            //TODO:小鸟眼睛 X
            this._hitcout++;
            if(this._hitcout>5){
                alcedo.dispatchCmd(GameState,GameState.OVER,{score:this._score});
            }
        }

        /**
         * 小鸟吃了彩色能量就会加分数
         */
        private onHitColour(e){
            if(!alcedo.core(GameState).isplaying)return;

            e.target.haseaten = true;
            e.target.display.visible = false;

            this._score+=10;
            alcedo.core(GUICycler).getScreen("playing").setScore(this._score);
        }

    }
}