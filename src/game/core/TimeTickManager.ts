/**
 * Created by tommyZZM on 2015/5/27.
 */
module game {

    export class TimeTickManager extends alcedo.AppSubCore {
        private _testdomdiv:dom.DomElement;
        public birdsmokecolour:string;

        public startUp() {
            this._testdomdiv = dom.query("<div style='color: #27ae60'></div>")[0];
            var tocolouryello = ()=>{
                TweenMax.to(this._testdomdiv.node,5,{delay:1,color:"#f1c40f",onComplete:tocolourorange});
            };
            var tocolourorange = ()=>{
                TweenMax.to(this._testdomdiv.node,5,{delay:1,color:"#e67e22",onComplete:tocolourpurple});
            };
            var tocolourpurple = ()=>{
                TweenMax.to(this._testdomdiv.node,5,{delay:1,color:"#9b59b6",onComplete:tocolourgreen});
            };
            var tocolourgreen = ()=>{
                TweenMax.to(this._testdomdiv.node,5,{delay:1,color:"#40d47e",onComplete:tocolouryello});
            };
            tocolouryello();

            stage.addEventListener(canvas.Stage.ENTER_MILLSECOND10, this.update, this, -9);
        }

        private update(){
            this.birdsmokecolour = this._testdomdiv.node.style.color;
        }
    }
}