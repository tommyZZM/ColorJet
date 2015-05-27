/**
 * Created by tommyZZM on 2015/4/17.
 */
module game {
    export class PlayGround extends SceneryGround {

        private _bird:Entity;
        private _levelroot:canvas.DisplatObjectContainer;

        protected startUp(){
            this._bird = new game.JetBird();

            this._bird.display.x = -100;
            this._bird.display.y = stage.stageHeight+100;
            this._bird.gravityenable = true;

            alcedo.core(WorldManager).addEntity(this._bird);
            alcedo.core(CameraManager).lookAt(this._bird);
            alcedo.core(ParallaxManager).referenceObject(this._bird);

            alcedo.addDemandListener(GameState,GameState.HELLO,this.resHello,this);
            alcedo.addDemandListener(GameState,GameState.PREPLAY,this.resPrePlay,this,1);
            alcedo.addDemandListener(GameState,GameState.PLAYING,this.resPlay,this);
            alcedo.addDemandListener(GameState,GameState.OVER,this.resOver,this);

            this._levelroot = new alcedo.canvas.DisplatObjectContainer();
            this.addChild(this._levelroot);
            this.addChild(this._bird.display);

            alcedo.core(LevelManager).startUp(this._levelroot);
            alcedo.core(GameControl).startUp(this._bird);
        }

        private resHello(){
            alcedo.core(CameraManager).yawX = 0.23;

            this._bird.clearForce();
            this._bird.velocity.reset();
            this._bird.x = 30;
            this._bird.y = stage.height-50;
            this._bird.applyMomentForce(new canvas.Vector2D(5,-5));
            alcedo.core(GameControl).enableAutoControl();
            alcedo.core(LevelManager).reset();
        }

        private resPrePlay(){
            trace("resPrePlay");
            this._bird.clearForce();
            this._bird.velocity.reset();
            this._bird.x = 0;
            this._bird.y = stage.height-50;
            this._bird.gravityenable = false;
            alcedo.core(GameControl).enableAutoControl(false);

            alcedo.core(LevelManager).reset().run();
        }

        private resPlay(){
            this._bird.gravityenable = true;
            this._bird.display["bird"].play(6);
            this._bird.applyMomentForce(new canvas.Vector2D(10,-12));
        }

        private resOver(){
            alcedo.core(GUICycler).toggleToScreen("over");
            alcedo.core(LevelManager).stop();
        }

        public get bird():JetBird{
            return <any>this._bird;
        }
    }
}