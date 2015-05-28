/**
 * Created by tommyZZM on 2015/5/28.
 *
 * 游戏基于TypeScript和Canvas制作。
 * 仍有很多不足，仅为个人学习研究之用。
 * 游戏玩法和设计参考了Whale Trail。
 *
 * 制作过程中参考了Egret和Pixi的源码。
 * 还使用了GSAP,SAT.js,TiledMap等框架和工具。
 * 感谢大家。
 *
 * 游戏源码和更多信息欢迎访问Github
 * https://github.com/tommyZZM
 *
 * @tommyZZM 20150528
 *
 */
module game{
    export class AboutScreen extends GUIScreen{
        private dialog:dom.DomElement;
        private confirmbtn:GUIButton;
        private content:string;

        public startUp(){
            this.dialog = this._ele.find(".dialog .content")[0];
            this.confirmbtn = new game.GUIButton(this._ele.find(".dialog .btn").first);

            this.dialog.css({"margin-top":alcedo.px(100+screen.height)});
            this.confirmbtn.ele.css({"margin-top":alcedo.px(screen.height/2)});

            this.confirmbtn.ele.addEventListener(dom.TouchEvent.TOUCH_TAP,this.onback,this);

            this.content = "<p>游戏基于TypeScript和Canvas制作。</p>" +
            "<p>仍有很多不足，仅为个人学习研究之用。</p>" +
            "<p></p>" +
            "<!--<p>制作过程中参考了Egret和Pixi的源码。</p>" +
            "<p>还使用了GSAP,SAT.js,TiledMap等框架和工具。</p>" +
            "<p>感谢大家。</p>-->" +
            "<p>&nbsp;</p>" +
            "<p>游戏源码和更多信息欢迎访问Github</p>" +
            "<p><a style='color: #2e9dd1' href='https://github.com/tommyZZM'>https://github.com/tommyZZM</a></p>";

            this.dialog.find(".text")[0].node.innerHTML = this.content
        }

        private onback(){
            alcedo.core(GUICycler).toggleToScreen("start");
        }

        public show(){
            trace("show",(screen.height-260)/2-16)

            TweenMax.to(this.dialog.node,1,{"margin-top":(screen.height-260)/2-16,ease:Elastic.easeOut.config(1, 0.8)});

            TweenMax.to(this.confirmbtn.node,0.9
                ,{delay:0.3,"margin-top":-56,ease:Elastic.easeOut.config(1, 0.8)})

        }

        public hide(callback){
            TweenMax.to(this.confirmbtn.node,0.5,{"margin-top":screen.height/2,delay:0.2,ease:Back.easeIn.config(2)});
            TweenMax.to(this.dialog.node,0.5,{"margin-top":100+screen.height,delay:0.6,ease:Back.easeIn.config(2)
                ,onComplete:()=>{
                    if(callback)callback();
                }});
        }
    }
}