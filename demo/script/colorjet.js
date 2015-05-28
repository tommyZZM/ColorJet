var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by tommyZZM on 2015/5/20.
 */
var game;
(function (game) {
    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity(display, opts) {
            _super.call(this);
            this._mass = 1;
            this._display = display;
            this._velocity = new alcedo.canvas.Vector2D();
            this._acceleration = new alcedo.canvas.Vector2D();
            this._force = new alcedo.canvas.Vector2D();
            //this._body = new SAT.Circle(new SAT.Vector(0,0),0);
        }
        Entity.prototype.sync = function () {
            if (!this._body || !this._display)
                return;
            this._body.pos["x"] = this._display.globalx;
            this._body.pos["y"] = this._display.globaly;
            if (this._body instanceof game.sat.Polygon) {
                this._body["offset"].x = -this.display.pivotOffsetX * this.display.scaleX;
                this._body["offset"].y = -this.display.pivotOffsetY * this.display.scaleY;
                this._body.setAngle(this.display.rotation * alcedo.Constant.DEG_TO_RAD);
            }
            else if (this._body instanceof game.sat.Circle) {
            }
        };
        //TODO:突变力和渐变力;
        Entity.prototype.applyForce = function (force) {
            this._force.add(force);
        };
        Entity.prototype.applyMomentForce = function (force) {
            var momentforce = force;
            this._velocity.add(momentforce.divide(this._mass));
        };
        Entity.prototype.clearForce = function () {
            this._force.reset();
        };
        Object.defineProperty(Entity.prototype, "curForce", {
            /**
             * Get
             * @returns {alcedo.canvas.Vector2D}
             */
            get: function () {
                return this._force;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "velocity", {
            get: function () {
                return this._velocity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "acceleration", {
            get: function () {
                return this._acceleration;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "speed", {
            get: function () {
                return this._velocity.length;
            },
            set: function (value) {
                this._velocity.length = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "display", {
            get: function () {
                return this._display;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "x", {
            get: function () {
                return this.display.x;
            },
            set: function (value) {
                this._display.x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "y", {
            get: function () {
                return this.display.y;
            },
            set: function (value) {
                this._display.y = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "left", {
            get: function () {
                return this.display.actualBound().x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "right", {
            get: function () {
                return this.display.actualBound().right;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "body", {
            get: function () {
                return this._body;
            },
            enumerable: true,
            configurable: true
        });
        Entity.ON_UPDATE = "Entity.ON_UPDAATE";
        return Entity;
    })(alcedo.EventDispatcher);
    game.Entity = Entity;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/20.
 */
var game;
(function (game) {
    var SceneryGround = (function (_super) {
        __extends(SceneryGround, _super);
        function SceneryGround() {
            _super.call(this);
            this.startUp();
        }
        SceneryGround.prototype.startUp = function () {
        };
        return SceneryGround;
    })(alcedo.canvas.DisplatObjectContainer);
    game.SceneryGround = SceneryGround;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/18.
 */
var game;
(function (game) {
    var GUIScreen = (function (_super) {
        __extends(GUIScreen, _super);
        function GUIScreen() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(GUIScreen.prototype, "ele", {
            get: function () {
                return this._ele;
            },
            set: function (ele) {
                if (!this._ele) {
                    this._ele = ele;
                    this.startUp();
                }
            },
            enumerable: true,
            configurable: true
        });
        GUIScreen.prototype.startUp = function () {
        };
        GUIScreen.prototype.show = function (callback) {
            if (callback)
                callback();
        };
        GUIScreen.prototype.hide = function (callback) {
            callback();
        };
        GUIScreen.prototype.onresize = function () {
        };
        return GUIScreen;
    })(alcedo.EventDispatcher);
    game.GUIScreen = GUIScreen;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/21.
 */
var game;
(function (game) {
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            _super.apply(this, arguments);
        }
        GameState.prototype.startUp = function () {
            this.addCmdHandler(GameState.HELLO, this.cmdHello);
            this.addCmdHandler(GameState.PREPLAY, this.cmdPrePlay);
            this.addCmdHandler(GameState.PLAYING, this.cmdPlaying);
            this.addCmdHandler(GameState.OVER, this.cmdOver);
        };
        GameState.prototype.cmdHello = function (e) {
            trace("cmdHello", e);
            this.dispatchDemand(GameState.HELLO, e);
        };
        GameState.prototype.cmdPrePlay = function (e) {
            trace("cmdPreplay");
            this.dispatchDemand(GameState.PREPLAY, e);
        };
        GameState.prototype.cmdPlaying = function (e) {
            this._isplaying = true;
            this.dispatchDemand(GameState.PLAYING, e);
        };
        GameState.prototype.cmdOver = function (e) {
            this._isplaying = false;
            trace("cmdOver");
            this.dispatchDemand(GameState.OVER, e);
        };
        Object.defineProperty(GameState.prototype, "isplaying", {
            get: function () {
                return this._isplaying;
            },
            enumerable: true,
            configurable: true
        });
        GameState.HELLO = "Hello";
        GameState.PREPLAY = "PrePlay";
        GameState.PLAYING = "Playing";
        GameState.OVER = "Over123";
        return GameState;
    })(alcedo.AppSubCore);
    game.GameState = GameState;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/18.
 */
var game;
(function (game) {
    var GUICycler = (function (_super) {
        __extends(GUICycler, _super);
        function GUICycler() {
            _super.apply(this, arguments);
        }
        GUICycler.prototype.startUp = function () {
            this.screenDict = new Dict();
            alcedo.core(game.CurtainManager).startUp();
            this.registScreen("loading", new game.LoadingScreen());
            this.registScreen("start", new game.StartScreen());
            this.registScreen("playing", new game.PlayingScreen());
            this.registScreen("over", new game.OverScreen());
            this.registScreen("about", new game.AboutScreen());
            this.toggleToScreen("loading");
        };
        GUICycler.prototype.toggleToScreen = function (name, callback) {
            var _this = this;
            var screen = this.screenDict.get(name);
            if (!screen) {
                warn("screen", name, "not found", screen);
                return;
            }
            if (this.currscreen) {
                this.currscreen.hide(function () {
                    _this.currscreen.ele.removeClass("active");
                    screen.ele.addClass("active");
                    screen.show(callback);
                    _this.currscreen = screen;
                });
            }
            else {
                screen.show(callback);
                this.currscreen = screen;
            }
        };
        GUICycler.prototype.registScreen = function (name, screenobj) {
            var screenele = game.dom.query(".screen." + name)[0];
            if (!screenele || this.screenDict.has(name)) {
                warn("fail regist screen", name, screenele);
                return;
            }
            screenobj.ele = screenele;
            this.screenDict.set(name, screenobj);
        };
        GUICycler.prototype.getScreen = function (name) {
            return this.screenDict.get(name);
        };
        GUICycler.instanceable = true;
        return GUICycler;
    })(alcedo.AppSubCore);
    game.GUICycler = GUICycler;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/27.
 */
var game;
(function (game) {
    /**
     * 游戏规则控制核心
     */
    var GameRule = (function (_super) {
        __extends(GameRule, _super);
        function GameRule() {
            _super.apply(this, arguments);
            /**
             * 检查小鸟的位置，如果小鸟掉进云层游戏结束
             */
            this._checkdelay = 0;
        }
        //private _birdlife:number = 3;
        GameRule.prototype.startUp = function (bird) {
            this._bird = bird;
            this._score = 0;
            this.addCmdHandler(GameRule.HIT_CLOUD, this.onHitCloud);
            this.addCmdHandler(GameRule.HIT_COLOUR, this.onHitColour);
            game.stage.addEventListener(alcedo.canvas.Stage.ENTER_MILLSECOND10, this.checkBird, this);
            alcedo.addDemandListener(game.GameState, game.GameState.PREPLAY, this.resetAll, this, 1);
        };
        GameRule.prototype.resetAll = function () {
            this._score = 0;
            this._hitcout = 0;
            alcedo.core(game.GUICycler).getScreen("playing").setScore(this._score);
        };
        GameRule.prototype.checkBird = function () {
            if (!alcedo.core(game.GameState).isplaying)
                return;
            //检测小鸟的位置
            if (this._bird.y > game.stage.height && this._bird.velocity.y > 0) {
                alcedo.dispatchCmd(game.GameState, game.GameState.OVER, { score: this._score });
            }
            this._checkdelay++;
            if (this._checkdelay > 50) {
                this._checkdelay = 0;
                this._score += 1;
                alcedo.core(game.GUICycler).getScreen("playing").setScore(this._score);
            }
        };
        GameRule.prototype.onHitCloud = function () {
            if (!alcedo.core(game.GameState).isplaying)
                return;
            //TODO:小鸟眼睛 X
            this._hitcout++;
            if (this._hitcout > 5) {
                alcedo.dispatchCmd(game.GameState, game.GameState.OVER, { score: this._score });
            }
        };
        /**
         * 小鸟吃了彩色能量就会加分数
         */
        GameRule.prototype.onHitColour = function (e) {
            if (!alcedo.core(game.GameState).isplaying)
                return;
            e.target.haseaten = true;
            e.target.display.visible = false;
            this._score += 10;
            alcedo.core(game.GUICycler).getScreen("playing").setScore(this._score);
        };
        GameRule.HIT_CLOUD = "GameRule_Hit_Cloud";
        GameRule.HIT_COLOUR = "GameRule_Hit_Colour";
        return GameRule;
    })(alcedo.AppSubCore);
    game.GameRule = GameRule;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/18.
 */
var game;
(function (game) {
    var GameCycler = (function (_super) {
        __extends(GameCycler, _super);
        function GameCycler() {
            _super.apply(this, arguments);
            this.debug = true;
        }
        GameCycler.prototype.startUp = function () {
            alcedo.core(game.CameraManager).startUp();
            alcedo.core(game.ParallaxManager).startUp();
            alcedo.core(game.WorldManager).startUp();
            alcedo.core(game.ColourTransformManager).startUp();
            this._backGround = new game.BackGround();
            this._playGround = new game.PlayGround();
            this._frontGround = new game.FrontGround();
            //初始化前景|舞台|背景
            game.stage.addChild(this._backGround);
            game.stage.addChild(this._playGround);
            game.stage.addChild(this._frontGround);
            alcedo.core(game.GameState).startUp();
            alcedo.core(game.GameRule).startUp(this._playGround.bird);
            alcedo.dispatchCmd(game.GameState, game.GameState.HELLO);
            alcedo.core(game.GUICycler).toggleToScreen("start");
        };
        GameCycler.instanceable = true;
        return GameCycler;
    })(alcedo.AppSubCore);
    game.GameCycler = GameCycler;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/17.
 *
 */
var game;
(function (game) {
    game.canvas = alcedo.canvas;
    game.dom = alcedo.dom;
    game.net = alcedo.net;
    game.sat = SAT;
    game.stage;
    var MainCycler = (function (_super) {
        __extends(MainCycler, _super);
        function MainCycler() {
            _super.apply(this, arguments);
        }
        MainCycler.prototype.cmdStartup = function () {
            //初始化GameStage
            this.stage = new alcedo.canvas.Stage(game.dom.query("#colorjet")[0], 480, 320, {
                background: "#5fe4fc",
                profiler: true,
                orient: true,
                ui: "colorjet-ui"
            });
            game.stage = this.stage;
            game.dom.query("body")[0].node.addEventListener("touchmove", function (e) {
                e.preventDefault();
            }, false);
            game.dom.resize(this.onResize, this);
            alcedo.core(game.GUICycler).startUp();
            alcedo.core(game.net.AsyncAssetsLoader).addEventListener(game.net.AsyncRESEvent.ASSETS_COMPLETE, this.onAssetLoaded, this);
            alcedo.core(game.net.AsyncAssetsLoader).addConfig("res/resource.json");
            alcedo.core(game.net.AsyncAssetsLoader).loadGroup("preload", "bgcloud", "fgcloud", "levels", "character");
        };
        //资源加载完成
        MainCycler.prototype.onAssetLoaded = function () {
            trace("loadcomplete");
            alcedo.core(game.GameCycler).startUp();
        };
        //屏幕适配解决方案
        MainCycler.prototype.onResize = function () {
            var _domwidth = alcedo.dom.width();
            var _domheight = alcedo.dom.height();
            this.stage.canvas.css({ width: _domwidth + "px", height: _domheight + "px" });
            //trace(this.stage.orientchanged)
            if (this.stage.orientchanged) {
                this.stage.canvas.css({ width: _domheight + "px", height: _domwidth + "px" });
                this.stage.container.css({
                    width: _domheight + "px",
                    height: _domwidth + "px"
                });
                this.stage.container.css({ left: (_domwidth - _domheight) / 2 + "px" });
                this.stage.container.css({ top: (_domheight - _domwidth) / 2 + "px" });
                this.stage.container.css_transform_rotate(-90);
            }
            else {
                this.stage.container.css({ width: _domwidth + "px", height: _domheight + "px" });
                this.stage.container.css({ top: "0px", left: "0px" });
                this.stage.container.css_transform_rotate(0);
            }
            this.stage.resizecontext();
            //trace(this.stage.orientchanged)
        };
        return MainCycler;
    })(alcedo.AppCycler);
    game.MainCycler = MainCycler;
    var screen = (function () {
        function screen() {
        }
        Object.defineProperty(screen, "width", {
            get: function () {
                if (game.dom.height() > game.dom.width()) {
                    return game.dom.height();
                }
                return game.dom.width();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(screen, "height", {
            get: function () {
                if (game.dom.height() > game.dom.width()) {
                    return game.dom.width();
                }
                return game.dom.height();
            },
            enumerable: true,
            configurable: true
        });
        return screen;
    })();
    game.screen = screen;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/27.
 */
var game;
(function (game) {
    var ColourTransformManager = (function (_super) {
        __extends(ColourTransformManager, _super);
        function ColourTransformManager() {
            _super.apply(this, arguments);
        }
        ColourTransformManager.prototype.startUp = function () {
            var _this = this;
            this._testdomdiv = game.dom.query("<div style='color: #27ae60'></div>")[0];
            var tocolouryello = function () {
                TweenMax.to(_this._testdomdiv.node, 5, { delay: 1, color: "#f1c40f", onComplete: tocolourorange });
            };
            var tocolourorange = function () {
                TweenMax.to(_this._testdomdiv.node, 5, { delay: 1, color: "#e67e22", onComplete: tocolourpurple });
            };
            var tocolourpurple = function () {
                TweenMax.to(_this._testdomdiv.node, 5, { delay: 1, color: "#9b59b6", onComplete: tocolourgreen });
            };
            var tocolourgreen = function () {
                TweenMax.to(_this._testdomdiv.node, 5, { delay: 1, color: "#40d47e", onComplete: tocolouryello });
            };
            tocolouryello();
            game.stage.addEventListener(game.canvas.Stage.ENTER_MILLSECOND10, this.update, this, -9);
        };
        ColourTransformManager.prototype.update = function () {
            this.birdsmokecolour = this._testdomdiv.node.style.color;
        };
        return ColourTransformManager;
    })(alcedo.AppSubCore);
    game.ColourTransformManager = ColourTransformManager;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/27.
 */
var game;
(function (game) {
    var SmokeParticle = (function (_super) {
        __extends(SmokeParticle, _super);
        function SmokeParticle() {
            _super.apply(this, arguments);
        }
        SmokeParticle.prototype.oncreate = function (x, y, mass) {
            if (mass === void 0) { mass = 1; }
            this._colour = alcedo.core(game.ColourTransformManager).birdsmokecolour;
            this.alpha = 0;
            this.scale.reset(0.6, 0.2);
        };
        SmokeParticle.prototype.display = function (renderer) {
            var context = renderer.context;
            context.beginPath();
            context.arc(0, 0, 6, 0, 2 * Math.PI, false);
            context.fillStyle = this._colour;
            context.fill();
        };
        SmokeParticle.prototype.prebron = function () {
            this.scale.x += 0.05;
            this.scale.y += 0.05;
            if (this.alpha < 1) {
                this.alpha += 0.1;
            }
            else {
                this.alpha = 1;
                return true;
            }
        };
        SmokeParticle.prototype.decaying = function () {
            this.alpha -= 0.01;
            this.scale.x += 0.06;
            this.scale.y += 0.06;
            if (this.alpha < 0) {
                this.alpha = 0;
                return true;
            }
        };
        return SmokeParticle;
    })(alcedo.canvas.Particle);
    game.SmokeParticle = SmokeParticle;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/22.
 */
var game;
(function (game) {
    var TextureRepository = alcedo.canvas.TextureRepository;
    var Cloud = (function (_super) {
        __extends(Cloud, _super);
        function Cloud(width, height) {
            _super.call(this, new game.canvas.DisplatObjectContainer());
            this.velocitystatic = true;
            this._cloud = new game.canvas.Sprite(alcedo.core(TextureRepository).get("darkcloud"));
            this._cloud.width = width;
            this._cloud.height = height;
            this._cloud.texture._textureWidth = width;
            this._cloud.texture._textureHeight = height;
            this.display.addChild(this._cloud);
            this._clouddebug = new game.canvas.graphic.Rectangle(width, height);
            this.display.addChild(this._clouddebug);
            this.display.width = this._clouddebug.width;
            this.display.height = this._clouddebug.height;
            this._clouddebug.alpha = 0.2;
            this._body = (new game.sat.Box(new game.sat.Vector(0, 0), this.display.width, this.display.height)).toPolygon();
            this.disactive();
        }
        Cloud.prototype.active = function () {
            this._clouddebug.fillcolour = "#f1c40f";
        };
        Cloud.prototype.disactive = function () {
            this._clouddebug.fillcolour = "#3498db";
        };
        return Cloud;
    })(game.Entity);
    game.Cloud = Cloud;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/23.
 */
var game;
(function (game) {
    var ColourPower = (function (_super) {
        __extends(ColourPower, _super);
        function ColourPower() {
            _super.call(this);
            this.velocitystatic = true;
            //TODO:������
            this._display = new game.canvas.graphic.Circle(10, alcedo.core(game.ColourTransformManager).birdsmokecolour);
            this._body = new SAT.Circle(new SAT.Vector(0, 0), 10);
        }
        return ColourPower;
    })(game.Entity);
    game.ColourPower = ColourPower;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/20.
 */
var game;
(function (game) {
    var JetBird = (function (_super) {
        __extends(JetBird, _super);
        //private _bodybox:sat.Box;
        function JetBird() {
            _super.call(this, new JetBirdSkin());
            //this._bodybox = new sat.Box(new sat.Vector(0,0),(this.display.width-42)*this.display.scaleX
            //    ,this.display.height*this.display.scaleY);
            //this._body = this._bodybox.toPolygon();
            this._body = new game.sat.Circle(new game.sat.Vector(0, 0), (this.display.height * this.display.scaleY) / 1.9);
            //this.debugBody();
        }
        JetBird.prototype.debugBody = function () {
            var debug = new game.canvas.graphic.Circle(this._body["r"], "#e74c3c");
            debug.alpha = 0.6;
            debug.x = this.display.width * this.display.pivotX;
            debug.y = this.display.height * this.display.pivotY;
            this.display.addChild(debug);
            //if(!alcedo.core(GameCycler).debug)return;
            //var debug = new canvas.graphic.Rectangle(this._bodybox.w/this.display.scaleX
            //    ,this._bodybox.h/this.display.scaleY,"#e74c3c");
            ////debug.pivotX = debug.pivotY = 0.5;
            //debug.alpha = 0.3;
            //(<any>this.display).addChild(debug);
            //
            //var boxbound:any = new canvas.DisplayGraphic();
            //boxbound._graphicfn = (ctx)=>{
            //    ctx.beginPath();
            //    for(var i=0;i<this.body.edges.length;i++){
            //        var next = i+1;
            //        if(next==this.body.edges.length)next =0;
            //        drawLineFromTo(ctx,{x:this.body.edges[i].x+this.body.pos.x
            //                ,y:this.body.edges[i].y+this.body.pos.y}
            //            ,{x:this.body.edges[next].x+this.body.pos.x
            //                ,y:this.body.edges[next].y+this.body.pos.y})
            //    }
            //
            //    ctx.stroke();
            //    ctx.lineWidth=1;
            //    ctx.strokeStyle='#8e44ad';
            //};
            //boxbound.alpha=0.66;
            //function drawLineFromTo(ctx,point:canvas.Ixy,point2:canvas.Ixy){
            //    ctx.moveTo(point.x,point.y);
            //    ctx.lineTo(point2.x,point2.y);
            //}
        };
        return JetBird;
    })(game.Entity);
    game.JetBird = JetBird;
    var JetBirdSkin = (function (_super) {
        __extends(JetBirdSkin, _super);
        function JetBirdSkin() {
            _super.call(this);
            this.compose();
        }
        JetBirdSkin.prototype.compose = function () {
            alcedo.core(game.canvas.MovieClipRepository).praseMovieClipData(alcedo.core(game.net.AsyncRES).get("smallalcedo_json"), alcedo.core(game.canvas.TextureRepository).get("smallalcedo_png"));
            this.bird = new alcedo.canvas.MovieClip(alcedo.core(game.canvas.MovieClipRepository).get("smallalcedo"));
            //this.bird.pivotX = 0.5;
            //this.bird.pivotY = 0.5;
            this.pivotX = 0.5;
            this.pivotY = 0.5;
            this.scaleALL(0.3);
            this.width = this.bird.width;
            this.height = this.bird.height;
            trace(this.bird.width, this.bird.height);
            this._smoke = new alcedo.canvas.ParticleEmitter({ spread: 6, max: 30, rate: 15, particleClass: game.SmokeParticle });
            this._smoke.play();
            this._smokepos = new alcedo.canvas.Vector2D(0.5, 0.16);
            var pos = this.bird.localToGlobal(this.width * this._smokepos.x, this.height * this._smokepos.y); //
            this._smoke.x = pos.x;
            this._smoke.y = pos.y;
            this.addChild(this._smoke);
            this.addChild(this.bird);
        };
        return JetBirdSkin;
    })(game.canvas.DisplatObjectContainer);
    game.JetBirdSkin = JetBirdSkin;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/19.
 */
var game;
(function (game) {
    var WorldManager = (function (_super) {
        __extends(WorldManager, _super);
        function WorldManager() {
            _super.apply(this, arguments);
        }
        WorldManager.prototype.startUp = function () {
            this._entities = [];
            game.stage.addEventListener(game.canvas.Stage.ENTER_MILLSECOND10, this.update, this);
            //trace("start",this)
        };
        WorldManager.prototype.update = function (e) {
            this.updateEntitiesPos(e); //物体运动
            this.precheckEntities(); //筛选并激活物体
            this.collisionCheck(); //对激活物体进行碰撞检测
        };
        WorldManager.prototype.updateEntitiesPos = function (e) {
            for (var i = 0; i < this._entities.length; i++) {
                var entitie = this._entities[i];
                if (entitie.velocitystatic) {
                    entitie.sync();
                    entitie.emit(game.Entity.ON_UPDATE, e);
                    continue;
                } //对于静态物体，不更新位置.
                if (entitie.gravityenable) {
                    entitie.applyMomentForce(game.canvas.Vector2D.identity(0, 0.09 * e.delay));
                }
                entitie._acceleration = entitie._force.divide(entitie._mass);
                entitie._velocity.x += (entitie._acceleration.x * e.delay);
                entitie._display.x += entitie._velocity.x * e.delay;
                entitie._velocity.y += entitie._acceleration.y * e.delay;
                entitie._display.y += entitie._velocity.y * e.delay;
                entitie._display.rotation = entitie._velocity.deg;
                //trace(entitie);
                //trace(entitie.speed);
                entitie.sync();
                entitie.emit(game.Entity.ON_UPDATE, e);
            }
        };
        WorldManager.prototype.precheckEntities = function () {
            //trace("precheckEntities",this._activedEntities);
            this._activedEntities = [];
            for (var i = 0; i < this._entities.length; i++) {
                //筛选合适物体
                var entitie = this._entities[i];
                if (entitie instanceof game.JetBird) {
                    this._testbird = entitie;
                }
                else if (entitie instanceof game.Cloud || entitie instanceof game.ColourPower) {
                    var globalx = entitie.display.globalx;
                    //trace(globalx);
                    if (globalx < game.stage.viewPort.right && globalx > game.stage.viewPort.x) {
                        this._activedEntities.push(entitie);
                    }
                }
            }
        };
        //private _resoponse:sat.Response = new sat.Response();
        WorldManager.prototype.collisionCheck = function () {
            if (!alcedo.core(game.GameState).isplaying)
                return;
            for (var i = 0; i < this._activedEntities.length; i++) {
                var entitie = this._activedEntities[i];
                if (entitie instanceof game.Cloud) {
                    //trace(entitie.hashIndex,entitie.body.pos.x,entitie.body);
                    //trace(entitie.body,entitie.body.pos.x,this._testbird.x);
                    //this._resoponse.clear();
                    if (SAT.testCirclePolygon(this._testbird.body, entitie.body)) {
                        alcedo.dispatchCmd(game.GameRule, game.GameRule.HIT_CLOUD, { target: entitie });
                        entitie.active();
                    }
                    else {
                        entitie.disactive();
                    }
                }
                if (entitie instanceof game.ColourPower) {
                    if (SAT.testCircleCircle(this._testbird.body, entitie.body)) {
                        if (!entitie.haseaten) {
                            alcedo.dispatchCmd(game.GameRule, game.GameRule.HIT_COLOUR, { target: entitie });
                        }
                    }
                }
            }
        };
        WorldManager.prototype.referenceObject = function (ref) {
            this._ref = ref;
        };
        WorldManager.prototype.addEntity = function (entity) {
            //trace("add",this)/
            var index = this._entities.indexOf(entity);
            if (index < 0) {
                this._entities.push(entity);
            }
            //trace(this._entities);
        };
        WorldManager.prototype.removeEntity = function (entity) {
            var index = this._entities.indexOf(entity);
            if (index >= 0) {
                this._entities.splice(index, 1);
            }
            //trace("removeEntity...",this._entities);
        };
        WorldManager.instanceable = true;
        return WorldManager;
    })(alcedo.AppSubCore);
    game.WorldManager = WorldManager;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/23.
 */
var game;
(function (game) {
    var BezierMaker = (function () {
        function BezierMaker() {
        }
        BezierMaker.create = function (points, accuracy) {
            if (accuracy === void 0) { accuracy = 10; }
            var curve = this.createcontrolpoint(points);
            return new game.canvas.Bezier2D(curve, accuracy);
        };
        BezierMaker.createcontrolpoint = function (points) {
            //计算控制点
            var i;
            var _curcepolygon = [];
            var _sourcepoints = [];
            var _controlponitsseed = [];
            var _controlpints = [];
            for (i = 0; i < points.length; i++) {
                var point0 = points[i];
                _sourcepoints.push(point0);
                var point1 = points[i + 1];
                if (!point1) {
                    continue;
                }
                this.tmppoint.reset(point0.x, point0.y);
                this.tmppoint.add(point1);
                this.tmppoint.divide(2);
                _controlponitsseed.push({ x: this.tmppoint.x, y: this.tmppoint.y });
            }
            if (_controlponitsseed.length === 1) {
                return [points[0], _controlponitsseed[0], points[1]];
            }
            for (i = 0; i < _controlponitsseed.length - 1; i++) {
                var point0 = _controlponitsseed[i];
                var point1 = _controlponitsseed[i + 1];
                this.tmppoint.reset(point0.x, point0.y);
                this.tmppoint.add(point1);
                this.tmppoint.divide(2);
                var point3 = points[i + 1];
                var dpoint = {
                    x: point3.x - this.tmppoint.x,
                    y: point3.y - this.tmppoint.y
                };
                _controlpints.push({
                    x: point0.x + dpoint.x,
                    y: point0.y + dpoint.y,
                    iscontrol: true
                }, {
                    x: point1.x + dpoint.x,
                    y: point1.y + dpoint.y,
                    iscontrol: true
                });
            }
            _curcepolygon.push(_sourcepoints.last);
            for (i = _sourcepoints.length - 2; i > 0; i--) {
                //trace(i);
                _curcepolygon.push(_controlpints.pop());
                _curcepolygon.push(_sourcepoints[i]);
                _curcepolygon.push(_controlpints.pop());
            }
            _curcepolygon.push(_sourcepoints.first);
            //trace(_curcepolygon);
            return _curcepolygon;
        };
        BezierMaker.tmppoint = new game.canvas.Vector2D();
        BezierMaker.tmplength = new game.canvas.Vector2D();
        return BezierMaker;
    })();
    game.BezierMaker = BezierMaker;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/21.
 */
var game;
(function (game) {
    /**
     * 描述关卡的类
     */
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level(levelconfig) {
            _super.call(this);
            if (!levelconfig)
                warn("level config invaild");
            this._levelconfig = levelconfig;
            this.width = this._levelconfig.pixelwidth;
            this.height = this._levelconfig.pixelheight;
            this._clouds = [];
            this._powers = [];
        }
        Object.defineProperty(Level.prototype, "right", {
            get: function () {
                return this.x + this.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Level.prototype, "levelconfig", {
            get: function () {
                return this._levelconfig;
            },
            enumerable: true,
            configurable: true
        });
        Level.prototype.render = function () {
            //trace(this._levelconfig)
            var i = 0;
            var cloudsdata = this._levelconfig.objects.obstacle_darkcloud;
            if (Array.isArray(cloudsdata)) {
                for (i = 0; i < cloudsdata.length; i++) {
                    var cloud = new game.Cloud(cloudsdata[i].width, cloudsdata[i].height);
                    cloud.x = cloudsdata[i].x;
                    cloud.y = cloudsdata[i].y;
                    this._clouds.push(cloud);
                    alcedo.core(game.WorldManager).addEntity(cloud);
                    this.addChild(cloud.display);
                }
            }
            //return;[是否渲染彩色能量]
            var colourpowerdata = this._levelconfig.objects.colourpower;
            if (Array.isArray(colourpowerdata)) {
                for (var i = 0; i < colourpowerdata.length; i++) {
                    var colourpower = colourpowerdata[i];
                    if (!colourpower.bezier) {
                        var sc = colourpower.points.length - 1;
                        colourpower.bezier = game.BezierMaker.create(colourpower.points, sc * 8);
                    }
                    var curve = colourpower.bezier.curve;
                    for (var j = 0; j < curve.length; j++) {
                        var singlepower = new game.ColourPower();
                        singlepower.x = curve[j].x;
                        singlepower.y = curve[j].y;
                        this._powers.push(singlepower);
                        alcedo.core(game.WorldManager).addEntity(singlepower);
                        this.addChild(singlepower.display);
                    }
                }
            }
        };
        Level.prototype.clear = function () {
            for (var i = 0; i < this._clouds.length; i++) {
                alcedo.core(game.WorldManager).removeEntity(this._clouds[i]);
            }
            for (var i = 0; i < this._powers.length; i++) {
                alcedo.core(game.WorldManager).removeEntity(this._powers[i]);
            }
            this.removeChildren();
            this._clouds = [];
            this._powers = [];
        };
        Level.prototype.debugArea = function (active) {
            if (!this._debugdraw) {
                this._debugdraw = new alcedo.canvas.graphic.Rectangle(this._levelconfig.pixelwidth, this._levelconfig.pixelheight, "#27AE60");
                this.addChild(this._debugdraw);
                this._debugdraw.alpha = 0.2;
            }
            this._debugdraw.visible = active;
            this.setChildIndex(this._debugdraw, 0);
        };
        return Level;
    })(alcedo.canvas.DisplatObjectContainer);
    game.Level = Level;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/20.
 */
var game;
(function (game) {
    var GameControl = (function (_super) {
        __extends(GameControl, _super);
        function GameControl() {
            _super.apply(this, arguments);
            this._speedmax = 6.9;
        }
        GameControl.prototype.startUp = function (plane, opts) {
            var _this = this;
            this._plane = plane;
            this._plane.addEventListener(game.Entity.ON_UPDATE, this.eachTime, this);
            this.addCmdHandler(GameControl.CTR_FLY_BEGIN, function () {
                if (!alcedo.core(game.GameState).isplaying)
                    return;
                _this.beginfly();
            });
            this.addCmdHandler(GameControl.CTR_FLY_RELEASE, this.endfly);
        };
        GameControl.prototype.eachTime = function (e) {
            if (this._plane.speed > this._speedmax) {
                this._plane.speed = this._speedmax;
            }
            //trace(this._flystate)
            if (this._flystate) {
                this.flyingup(e);
            }
            this.autoControl();
        };
        GameControl.prototype.enableAutoControl = function (boo) {
            if (boo === void 0) { boo = true; }
            this._autocontrol = boo;
            this._flystate = false;
        };
        GameControl.prototype.beginfly = function () {
            if (this._flystate)
                return;
            //trace("beginfly");
            //trace(this._plane.curForce.x, this._plane.curForce.y)
            this._flystate = true;
            this._plane.display.bird.play(6);
        };
        GameControl.prototype.flyingup = function (e) {
            //TODO:FUCK
            //this._plane.velocity.deg+=-3;
            //this._plane.speed+=0.01;
            //this._plane.velocity.y-=0.1;
            //this._plane.speed+=0.01;
            var circle_force = this._plane.velocity.normalize().clone();
            circle_force.length = 0.2 * e.delay;
            circle_force.y -= 0.1;
            circle_force.x *= 0.9;
            //trace(circle_force.y)
            //var lock_velocity = this._plane.velocity.length;
            this._plane.applyMomentForce(circle_force);
            //trace(this._plane.velocity.x, this._plane.velocity.y);
            //trace(this._plane.speed,this._plane.velocity.deg)
        };
        GameControl.prototype.endfly = function () {
            if (!this._flystate)
                return;
            //trace("endfly");
            this._flystate = false;
            this._plane.display.bird.playToAndStop(1);
        };
        GameControl.prototype.autoControl = function () {
            if (!this._autocontrol)
                return;
            if (this._plane.y > game.stage.height * 0.6 && !this._autoflyup) {
                this._autoflyup = true;
            }
            if (this._plane.velocity.deg > -30 && this._autoflyup) {
                this.beginfly();
            }
            else {
                this._autoflyup = false;
                this.endfly();
            }
        };
        GameControl.instanceable = true;
        GameControl.CTR_FLY_BEGIN = "CTR_FLY_BEGIN";
        GameControl.CTR_FLY_RELEASE = "CTR_FLY_RELEASE";
        return GameControl;
    })(alcedo.AppSubCore);
    game.GameControl = GameControl;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/4/21.
 */
var game;
(function (game) {
    /**
     * 镜头控制器
     */
    var CameraManager = (function (_super) {
        __extends(CameraManager, _super);
        function CameraManager() {
            _super.apply(this, arguments);
            this.yawX = 0.5;
            this.yawY = 0.5;
        }
        CameraManager.prototype.startUp = function () {
            this._camera = game.stage.camera;
            this._lookat = new alcedo.canvas.Point2D(game.stage.width / 2, game.stage.height / 2);
            game.stage.addEventListener(alcedo.canvas.Stage.ENTER_MILLSECOND10, this.onEachTime, this, -10);
            game.stage.addEventListener(game.canvas.Stage.RESIZED, this.onresize, this);
        };
        CameraManager.prototype.lookAt = function (target) {
            if (!target)
                return;
            this._lookat = target;
            game.stage.camera.zoomTo(this._lookat.x, this._lookat.y, 1, this.yawX, this.yawY);
        };
        CameraManager.prototype.onEachTime = function () {
            this.updateCamera();
            this.limitTation();
        };
        /**更新镜头**/ //TODO:镜头缓动;
        //private _dx:number = 0;
        CameraManager.prototype.updateCamera = function () {
            //this._dx = this._lookat.x-stage.camera.x;
            game.stage.camera.zoomTo(this._lookat.x, this._lookat.y, 1, this.yawX, this.yawY);
            //trace(this._lookat.x, this._lookat.y);
        };
        CameraManager.prototype.limitTation = function () {
            //镜头范围限制
            var viewfinder = this._camera.viewfinder();
            if (this._camera.viewfinder().height > game.stage.height) {
                this._camera.focal = 1;
            }
            if (viewfinder.bottom > game.stage.height) {
                this._camera.y = game.stage.height - (viewfinder.height * (1 - this._camera.yawY));
            }
            else if (viewfinder.y <= 0) {
                this._camera.focal = (game.stage.height - viewfinder.y) / game.stage.height;
                //trace(stage.height/(stage.height-viewfinder.y));
                if (this._camera.focal > 2.3)
                    this._camera.focal = 2.3;
            }
            viewfinder = this._camera.viewfinder();
            if (viewfinder.x < 0) {
                this._camera.x = viewfinder.width / 2;
            }
        };
        CameraManager.prototype.onresize = function () {
            //trace("onresize")
            var viewfinder = this._camera.viewfinder();
            //trace(viewfinder.bottom,stage.height,stage.stageHeight,screen.height)
        };
        CameraManager.instanceable = true;
        return CameraManager;
    })(alcedo.AppSubCore);
    game.CameraManager = CameraManager;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/21.
 */
var game;
(function (game) {
    /**
     * 游戏关卡,地图管理器...
     */
    var CHECK_DELAY = 3;
    var MAX_LEVE_COUNT = 2;
    var LevelManager = (function (_super) {
        __extends(LevelManager, _super);
        function LevelManager() {
            _super.apply(this, arguments);
            this._checkdelay = 0;
            this._levelpassed = 0;
        }
        LevelManager.prototype.startUp = function (root) {
            this._root = root;
            this._levelobjs = [];
            this._levelspool = new Dict();
            this._activelevels = [];
            var levels = alcedo.core(game.net.AsyncRES).find(/level_\w+/i);
            if (levels.length > 0) {
                for (var i = 0; i < levels.length; i++) {
                    levels[i].id = i;
                    this._levelobjs.push(levels[i]);
                    this._levelspool.set(i + "", []);
                }
            }
            //trace("LevelManager initilize",this._levelobjs);
            game.stage.addEventListener(alcedo.canvas.Stage.ENTER_SECOND, this.update, this);
        };
        LevelManager.prototype.update = function (e) {
            var levelobj;
            var level;
            var tmplevel;
            //trace(this._checkdelay,CHECK_DELAY);
            if (this._checkdelay === CHECK_DELAY && this._runstate) {
                if (this._activelevels.length < MAX_LEVE_COUNT) {
                    levelobj = this._levelobjs.randomselect();
                    //trace(levelobj.id,this._levelspool.get(levelobj.id));
                    tmplevel = this._levelspool.get(levelobj.id).pop();
                    if (this._activelevels.length === 0) {
                        //首次创建
                        level = tmplevel || new game.Level(levelobj);
                        level.x = game.stage.viewPort.right + 300;
                        this._root.addChild(level);
                        this._activelevels.push(level);
                    }
                    else {
                        //trace("hi");
                        level = tmplevel || new game.Level(levelobj);
                        level.x = this._activelevels.last.x + this._activelevels.last.width + 100;
                        this._root.addChild(level);
                        this._activelevels.push(level);
                    }
                    level.y = -100;
                    level.render();
                }
                var headlevel = this._activelevels.first;
                if (headlevel.right < game.stage.viewPort.x) {
                    this._activelevels.shift();
                    headlevel.removeFromParent();
                    headlevel.clear();
                    this._levelspool.get(headlevel.levelconfig.id).push(headlevel);
                }
            }
            //this._checkdelay++;
            //if(this._checkdelay>CHECK_DELAY){
            //    this._checkdelay = 0;
            //}
        };
        LevelManager.prototype.run = function () {
            this._checkdelay = CHECK_DELAY;
            this._runstate = true;
            return this;
        };
        LevelManager.prototype.stop = function () {
            this._runstate = false;
            return this;
        };
        LevelManager.prototype.reset = function () {
            for (var i = 0; i < this._activelevels.length; i++) {
                this._activelevels[i].clear();
            }
            this._activelevels = [];
            this._levelpassed = 0;
            this._root.removeChildren();
            return this;
        };
        Object.defineProperty(LevelManager.prototype, "root", {
            get: function () {
                return this._root;
            },
            enumerable: true,
            configurable: true
        });
        return LevelManager;
    })(alcedo.AppSubCore);
    game.LevelManager = LevelManager;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/19.
 */
var game;
(function (game) {
    var IParalaxReference = (function () {
        function IParalaxReference() {
        }
        return IParalaxReference;
    })();
    game.IParalaxReference = IParalaxReference;
    var ParallaxManager = (function (_super) {
        __extends(ParallaxManager, _super);
        function ParallaxManager() {
            _super.apply(this, arguments);
            this.CHECK_DELAY = 20;
            this._checkdelay = 0;
        }
        ParallaxManager.prototype.startUp = function () {
            if (!game.stage) {
                warn(this.className, "startup fail");
            }
            this._parallaxscenery = new Dict();
            this._checkdelay = this.CHECK_DELAY;
            game.stage.addEventListener(game.canvas.Stage.ENTER_MILLSECOND10, this.update, this, -9);
            alcedo.addDemandListener(game.GameState, game.GameState.PREPLAY, this.resetPosToZero, this, 2);
            alcedo.addDemandListener(game.GameState, game.GameState.HELLO, this.resetPosToZero, this, 2);
        };
        ParallaxManager.prototype.referenceObject = function (ref) {
            this._ref = ref;
        };
        ParallaxManager.prototype.resetPosToZero = function () {
            //把布景重置
            var parallaxs = this._parallaxscenery.values;
            for (var i = 0; i < parallaxs.length; i++) {
                var parallax = parallaxs[i];
                var child = parallax.container.children[0];
                parallax.container.x = 0;
                parallax.container.removeChildren();
                if (child) {
                    child.x = 0;
                    parallax.container.addChild(child);
                }
            }
        };
        ParallaxManager.prototype.update = function (e) {
            //trace(alcedo.core(CameraManager).dx);
            var parallaxs = this._parallaxscenery.values;
            if (parallaxs.length === 0 || !this._ref) {
                return;
            }
            for (var i = 0; i < parallaxs.length; i++) {
                var parallax = parallaxs[i];
                //trace(this._ref.velocity.x);
                parallax.container.x += (this._ref.velocity.x * parallax.depth * e.delay);
                var children = parallax.container.children.copy();
                var lastchild = children.last;
                for (var j = 0; j < children.length - 1; j++) {
                    var child = children[j];
                    if ((!child.isInViewPort()) && ((child.globalx) < (game.stage.viewPort.x - child.actualWidth()))) {
                        parallax.pool.push(child);
                        child.removeFromParent();
                    }
                }
                //检查并创建新的视差布景(每200毫秒检查一次)
                //trace(i,parallax,this._checkdelay,this.CHECK_DELAY,this._checkdelay===this.CHECK_DELAY);
                if (this._checkdelay === this.CHECK_DELAY) {
                    parallax.container.y = game.stage.height - parallax.offsety;
                    //trace(parallax.container.y)
                    children = parallax.container.children.copy();
                    if (children.length < parallax.maxcount) {
                        for (var k = 0; k < (parallax.maxcount - children.length); k++) {
                            var child;
                            if (parallax.pool.length > 0 && parallax.pool.last instanceof game.canvas.Sprite) {
                                child = parallax.pool.pop();
                                child.texture = parallax.textures.randomselect();
                            }
                            else {
                                child = new game.canvas.Sprite(parallax.textures.randomselect());
                            }
                            //对象池
                            if (parallax.container.children.length > 0) {
                                lastchild = parallax.container.children.last;
                            }
                            if (lastchild) {
                                child.x = lastchild.x + lastchild.actualBound().width;
                            }
                            else {
                                child.x = parallax.beginx; //TODO:第一个物体起始点
                            }
                            child.y = 0;
                            child.pivotX = 0;
                            child.pivotY = 1;
                            child.scaleToWidth(game.stage.stageWidth * parallax.widthprecent);
                            parallax.container.addChild(child);
                        }
                    }
                }
            }
            this._checkdelay++;
            if (this._checkdelay > this.CHECK_DELAY) {
                this._checkdelay = 0;
            }
        };
        ParallaxManager.prototype.addParallaxSceneryAt = function (ground, textures, opts) {
            if (this._parallaxscenery.has(opts.name)) {
                warn(opts.name, "already be taken... moreinfo", opts);
            }
            var _textures = textures;
            if (textures instanceof game.canvas.Texture) {
                _textures = [textures];
            }
            //创建一个视差布景对象
            var parallax = {
                textures: _textures,
                depth: 1 / opts.depth,
                beginx: opts.beginx ? opts.beginx : 0,
                offsety: opts.offsety || 0,
                widthprecent: opts.widthprecent || 1,
                alpha: opts.alpha || 1,
                maxcount: opts.maxcount || 6,
                container: new game.canvas.DisplatObjectContainer(),
                pool: []
            };
            parallax.container.y = game.stage.height - parallax.offsety;
            ground.addChild(parallax.container);
            this._parallaxscenery.set(opts.name, parallax);
            return parallax.container;
        };
        ParallaxManager.instanceable = true;
        return ParallaxManager;
    })(alcedo.AppSubCore);
    game.ParallaxManager = ParallaxManager;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/18.
 */
var game;
(function (game) {
    var CurtainManager = (function (_super) {
        __extends(CurtainManager, _super);
        function CurtainManager() {
            _super.apply(this, arguments);
        }
        CurtainManager.prototype.startUp = function () {
            this.curtain = game.dom.query("#curtain").first;
            this.curtain.css({ width: game.screen.width, height: game.screen.height, background: "black" });
        };
        CurtainManager.prototype.show = function (callback, delay) {
            if (delay === void 0) { delay = 0; }
            this.curtain.css({ height: game.screen.height });
            TweenMax.to(this.curtain.node, 1, { opacity: 1, delay: delay, onComplete: function () {
                if (callback)
                    callback();
            } });
        };
        CurtainManager.prototype.hide = function (callback, delay) {
            var _this = this;
            if (delay === void 0) { delay = 0; }
            TweenMax.to(this.curtain.node, 1, { opacity: 0, delay: delay, onComplete: function () {
                if (callback)
                    callback();
                //trace("cur hrer");
                _this.curtain.css({ height: 0 });
            } });
        };
        CurtainManager.instanceable = true;
        return CurtainManager;
    })(alcedo.AppSubCore);
    game.CurtainManager = CurtainManager;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/18.
 */
var game;
(function (game) {
    var GUIButton = (function () {
        function GUIButton(ele) {
            this._ele = ele;
            this._ele.addEventListener(game.dom.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this._ele.addEventListener(game.dom.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        }
        GUIButton.prototype.onTouchBegin = function () {
            //trace("hrer");//
            TweenMax.to(this._ele.node, 0.2, { scale: 0.8 });
        };
        GUIButton.prototype.onTouchEnd = function () {
            TweenMax.to(this._ele.node, 0.2, { scale: 1 });
        };
        GUIButton.prototype.destruct = function () {
            this._ele.removeEventListener(game.dom.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this._ele.removeEventListener(game.dom.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        Object.defineProperty(GUIButton.prototype, "ele", {
            get: function () {
                return this._ele;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GUIButton.prototype, "node", {
            get: function () {
                return this._ele.node;
            },
            enumerable: true,
            configurable: true
        });
        return GUIButton;
    })();
    game.GUIButton = GUIButton;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/26.
 */
var game;
(function (game) {
    var ScoreLabel = (function () {
        function ScoreLabel(ele) {
            this._ele = ele;
            this._text = this._ele.find(".text")[0];
            this._letters = [];
            for (var i = 0; i < 7; i++) {
                this._letters.push(game.dom.query("<div></div>")[0]);
            }
        }
        Object.defineProperty(ScoreLabel.prototype, "ele", {
            get: function () {
                return this._ele;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreLabel.prototype, "score", {
            set: function (num) {
                var str = num + "";
                this._text.hide();
                this._text.node.innerHTML = ""; //removeChildren
                for (var i = 0; i < str.length; i++) {
                    var letter = this._letters[i];
                    if (!letter)
                        continue;
                    letter.node.className = "letter num" + str[i];
                    this._text.appendChild(letter);
                }
                this._text.show();
            },
            enumerable: true,
            configurable: true
        });
        return ScoreLabel;
    })();
    game.ScoreLabel = ScoreLabel;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/4/17.
 */
var game;
(function (game) {
    var BackGround = (function (_super) {
        __extends(BackGround, _super);
        function BackGround() {
            _super.apply(this, arguments);
        }
        BackGround.prototype.startUp = function () {
            this._clouds = alcedo.core(game.ParallaxManager).addParallaxSceneryAt(this, alcedo.core(game.canvas.TextureRepository).find(/bgcloud\d{2}/), {
                name: "clouds",
                depth: 2,
                widthprecent: 1.6,
                offsety: 10
            });
            this.addChild(this._clouds);
            //trace(this._clouds);
        };
        return BackGround;
    })(game.SceneryGround);
    game.BackGround = BackGround;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/4/17.
 */
var game;
(function (game) {
    var FrontGround = (function (_super) {
        __extends(FrontGround, _super);
        function FrontGround() {
            _super.apply(this, arguments);
        }
        FrontGround.prototype.startUp = function () {
            this._clouds = alcedo.core(game.ParallaxManager).addParallaxSceneryAt(this, alcedo.core(game.canvas.TextureRepository).get("fgcloud"), {
                name: "clouds2",
                depth: 5,
                beginx: 0
            });
            this.addChild(this._clouds);
            //trace(this._clouds);
        };
        return FrontGround;
    })(game.SceneryGround);
    game.FrontGround = FrontGround;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/4/17.
 */
var game;
(function (game) {
    var PlayGround = (function (_super) {
        __extends(PlayGround, _super);
        function PlayGround() {
            _super.apply(this, arguments);
        }
        PlayGround.prototype.startUp = function () {
            this._bird = new game.JetBird();
            this._bird.display.x = -100;
            this._bird.display.y = game.stage.stageHeight + 100;
            this._bird.gravityenable = true;
            alcedo.core(game.WorldManager).addEntity(this._bird);
            alcedo.core(game.CameraManager).lookAt(this._bird);
            alcedo.core(game.ParallaxManager).referenceObject(this._bird);
            alcedo.addDemandListener(game.GameState, game.GameState.HELLO, this.resHello, this);
            alcedo.addDemandListener(game.GameState, game.GameState.PREPLAY, this.resPrePlay, this, 1);
            alcedo.addDemandListener(game.GameState, game.GameState.PLAYING, this.resPlay, this);
            alcedo.addDemandListener(game.GameState, game.GameState.OVER, this.resOver, this);
            this._levelroot = new alcedo.canvas.DisplatObjectContainer();
            this.addChild(this._levelroot);
            this.addChild(this._bird.display);
            alcedo.core(game.LevelManager).startUp(this._levelroot);
            alcedo.core(game.GameControl).startUp(this._bird);
        };
        PlayGround.prototype.resHello = function () {
            alcedo.core(game.CameraManager).yawX = 0.23;
            this._bird.clearForce();
            this._bird.velocity.reset();
            this._bird.x = 30;
            this._bird.y = game.stage.height - 50;
            this._bird.applyMomentForce(new game.canvas.Vector2D(5, -5));
            alcedo.core(game.GameControl).enableAutoControl();
            alcedo.core(game.LevelManager).reset();
        };
        PlayGround.prototype.resPrePlay = function () {
            trace("resPrePlay");
            this._bird.clearForce();
            this._bird.velocity.reset();
            this._bird.x = 0;
            this._bird.y = game.stage.height - 50;
            this._bird.gravityenable = false;
            alcedo.core(game.GameControl).enableAutoControl(false);
            alcedo.core(game.LevelManager).reset().run();
        };
        PlayGround.prototype.resPlay = function () {
            this._bird.gravityenable = true;
            this._bird.display["bird"].play(6);
            this._bird.applyMomentForce(new game.canvas.Vector2D(10, -12));
        };
        PlayGround.prototype.resOver = function () {
            alcedo.core(game.GUICycler).toggleToScreen("over");
            alcedo.core(game.LevelManager).stop();
            alcedo.core(game.GameControl).endfly();
        };
        Object.defineProperty(PlayGround.prototype, "bird", {
            get: function () {
                return this._bird;
            },
            enumerable: true,
            configurable: true
        });
        return PlayGround;
    })(game.SceneryGround);
    game.PlayGround = PlayGround;
})(game || (game = {}));
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
var game;
(function (game) {
    var AboutScreen = (function (_super) {
        __extends(AboutScreen, _super);
        function AboutScreen() {
            _super.apply(this, arguments);
        }
        AboutScreen.prototype.startUp = function () {
            this.dialog = this._ele.find(".dialog .content")[0];
            this.confirmbtn = new game.GUIButton(this._ele.find(".dialog .btn").first);
            this.dialog.css({ "margin-top": alcedo.px(100 + game.screen.height) });
            this.confirmbtn.ele.css({ "margin-top": alcedo.px(game.screen.height / 2) });
            this.confirmbtn.ele.addEventListener(game.dom.TouchEvent.TOUCH_TAP, this.onback, this);
            this.content = "<p>游戏基于TypeScript和Canvas制作。</p>" + "<p>仍有很多不足，仅为个人学习研究之用。</p>" + "<p></p>" + "<!--<p>制作过程中参考了Egret和Pixi的源码。</p>" + "<p>还使用了GSAP,SAT.js,TiledMap等框架和工具。</p>" + "<p>感谢大家。</p>-->" + "<p>&nbsp;</p>" + "<p>游戏源码和更多信息欢迎访问Github</p>" + "<p><a style='color: #2e9dd1' href='https://github.com/tommyZZM'>https://github.com/tommyZZM</a></p>";
            this.dialog.find(".text")[0].node.innerHTML = this.content;
        };
        AboutScreen.prototype.onback = function () {
            alcedo.core(game.GUICycler).toggleToScreen("start");
        };
        AboutScreen.prototype.show = function () {
            trace("show", (game.screen.height - 260) / 2 - 16);
            TweenMax.to(this.dialog.node, 1, { "margin-top": (game.screen.height - 260) / 2 - 16, ease: Elastic.easeOut.config(1, 0.8) });
            TweenMax.to(this.confirmbtn.node, 0.9, { delay: 0.3, "margin-top": -56, ease: Elastic.easeOut.config(1, 0.8) });
        };
        AboutScreen.prototype.hide = function (callback) {
            TweenMax.to(this.confirmbtn.node, 0.5, { "margin-top": game.screen.height / 2, delay: 0.2, ease: Back.easeIn.config(2) });
            TweenMax.to(this.dialog.node, 0.5, { "margin-top": 100 + game.screen.height, delay: 0.6, ease: Back.easeIn.config(2), onComplete: function () {
                if (callback)
                    callback();
            } });
        };
        return AboutScreen;
    })(game.GUIScreen);
    game.AboutScreen = AboutScreen;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/18.
 */
var game;
(function (game) {
    var LoadingScreen = (function (_super) {
        __extends(LoadingScreen, _super);
        function LoadingScreen() {
            _super.call(this);
        }
        LoadingScreen.prototype.show = function () {
            //TODO:加载进度条
        };
        LoadingScreen.prototype.hide = function (callback) {
            alcedo.core(game.CurtainManager).hide(callback);
        };
        return LoadingScreen;
    })(game.GUIScreen);
    game.LoadingScreen = LoadingScreen;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/18.
 */
var game;
(function (game) {
    var OverScreen = (function (_super) {
        __extends(OverScreen, _super);
        function OverScreen() {
            _super.apply(this, arguments);
        }
        OverScreen.prototype.startUp = function () {
            this._btnsgroup = this._ele.find(".btns")[0];
            this._homebtn = new game.GUIButton(game.dom.query(".btn.home").first);
            this._restartbtn = new game.GUIButton(game.dom.query(".btn.restart").first);
            this._btnsgroup.css({ top: (game.screen.height - 100) / 2 });
            this._homebtn.ele.css({ top: game.screen.height });
            this._restartbtn.ele.css({ top: game.screen.height });
            this._homebtn.ele.addEventListener(game.dom.TouchEvent.TOUCH_TAP, this.onhome, this);
            this._restartbtn.ele.addEventListener(game.dom.TouchEvent.TOUCH_TAP, this.onrestart, this);
        };
        OverScreen.prototype.onhome = function () {
            this._currbtn = this._homebtn;
            this._otherbtn = this._restartbtn;
            this.hide();
            alcedo.core(game.CurtainManager).show(function () {
                alcedo.dispatchCmd(game.GameState, game.GameState.HELLO);
                alcedo.core(game.CurtainManager).hide(function () {
                    alcedo.core(game.GUICycler).toggleToScreen("start");
                });
            }, 0.8);
        };
        OverScreen.prototype.onrestart = function () {
            this._currbtn = this._restartbtn;
            this._otherbtn = this._homebtn;
            alcedo.core(game.GUICycler).toggleToScreen("playing");
            alcedo.core(game.CurtainManager).show(function () {
                //TODO:发送开始游戏信号
                alcedo.dispatchCmd(game.GameState, game.GameState.PREPLAY);
                alcedo.core(game.CurtainManager).hide(function () {
                    alcedo.dispatchCmd(game.GameState, game.GameState.PLAYING);
                }, 0.2);
            }, 0.8);
        };
        OverScreen.prototype.show = function () {
            trace("over screen show");
            TweenMax.to(this._homebtn.node, 1, { top: 0, ease: Elastic.easeOut.config(0.9, 0.8) });
            TweenMax.to(this._restartbtn.node, 1, { top: 0, delay: 0.3, ease: Elastic.easeOut.config(0.9, 0.8) });
        };
        OverScreen.prototype.hide = function (callback) {
            TweenMax.to(this._currbtn.node, 0.6, { top: game.screen.height, ease: Back.easeIn.config(2) });
            TweenMax.to(this._otherbtn.node, 0.7, { top: game.screen.height, delay: 0.1, onComplete: function () {
                if (callback)
                    callback();
            } });
        };
        return OverScreen;
    })(game.GUIScreen);
    game.OverScreen = OverScreen;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/18.
 */
var game;
(function (game) {
    var PlayingScreen = (function (_super) {
        __extends(PlayingScreen, _super);
        function PlayingScreen() {
            _super.apply(this, arguments);
        }
        PlayingScreen.prototype.startUp = function () {
            this._score = new game.ScoreLabel(this._ele.find(".score")[0]);
            this._score.ele.css({ top: alcedo.px(-100) });
            this._score.score = 0;
        };
        PlayingScreen.prototype.show = function () {
            trace("play screen show");
            game.stage.addEventListener(game.canvas.TouchEvent.TOUCH_BEGIN, this.ontapBegin, this);
            game.stage.addEventListener(game.canvas.TouchEvent.TOUCH_END, this.ontapEnd, this);
            TweenMax.to(this._score.ele.node, 0.5, { delay: 2, top: 0 });
        };
        PlayingScreen.prototype.hide = function (callback) {
            var _this = this;
            trace("play screen hide");
            TweenMax.to(this._score.ele.node, 0.5, { top: alcedo.px(-100), onComplete: function () {
                game.stage.removeEventListener(game.canvas.TouchEvent.TOUCH_BEGIN, _this.ontapBegin, _this);
                game.stage.removeEventListener(game.canvas.TouchEvent.TOUCH_END, _this.ontapEnd, _this);
                if (callback)
                    callback();
                //trace("here");
            } });
        };
        PlayingScreen.prototype.ontapBegin = function () {
            //trace("hi");
            alcedo.dispatchCmd(game.GameControl, game.GameControl.CTR_FLY_BEGIN);
        };
        PlayingScreen.prototype.ontapEnd = function () {
            alcedo.dispatchCmd(game.GameControl, game.GameControl.CTR_FLY_RELEASE);
        };
        PlayingScreen.prototype.setScore = function (score) {
            this._score.score = score;
        };
        return PlayingScreen;
    })(game.GUIScreen);
    game.PlayingScreen = PlayingScreen;
})(game || (game = {}));
/**
 * Created by tommyZZM on 2015/5/18.
 */
var game;
(function (game) {
    var StartScreen = (function (_super) {
        __extends(StartScreen, _super);
        function StartScreen() {
            _super.apply(this, arguments);
        }
        StartScreen.prototype.startUp = function () {
            this._title = game.dom.query(".start .title").first;
            this._startbtn = new game.GUIButton(game.dom.query(".btn.start").first);
            this._aboutbtn = new game.GUIButton(game.dom.query(".btn.about").first);
            this._title.css({ top: -100 });
            this._startbtn.ele.css({ top: 100 + game.screen.height });
            this._aboutbtn.ele.css({ top: 100 + game.screen.width });
            this._startbtn.ele.addEventListener(game.dom.TouchEvent.TOUCH_TAP, this.onstart, this);
            this._aboutbtn.ele.addEventListener(game.dom.TouchEvent.TOUCH_TAP, this.onabout, this);
        };
        StartScreen.prototype.onstart = function () {
            alcedo.core(game.GUICycler).toggleToScreen("playing");
            alcedo.core(game.CurtainManager).show(function () {
                //TODO:发送开始游戏信号
                alcedo.dispatchCmd(game.GameState, game.GameState.PREPLAY);
                alcedo.core(game.CurtainManager).hide(function () {
                    alcedo.dispatchCmd(game.GameState, game.GameState.PLAYING);
                }, 0.2);
            }, 0.8);
        };
        StartScreen.prototype.onabout = function () {
            alcedo.core(game.GUICycler).toggleToScreen("about");
        };
        StartScreen.prototype.show = function (callback) {
            game.dom.query("#github")[0].show();
            //dom.query("#github")[0].show().css({opacity:0});
            TweenMax.to(game.dom.query("#github")[0].node, 0.39, { opacity: 1 });
            var titletop = game.screen.height / 2 - (alcedo.toValue(this._title.attr("height")) * 1.3);
            //trace(screen.height/2,alcedo.toValue(this._title.attr("height")))
            TweenMax.to(this._title.node, 0.39, { top: titletop });
            TweenMax.to(this._startbtn.node, 1, { top: titletop - 6, delay: 0.3, ease: Elastic.easeOut.config(0.9, 0.8) });
            TweenMax.to(this._aboutbtn.node, 1, { top: titletop, delay: 0.6, ease: Elastic.easeOut.config(0.9, 0.8), onComplete: function () {
                if (callback)
                    callback();
            } }); //
            game.stage.addEventListener(game.canvas.Stage.RESIZED, this.onresize, this);
            //trace(Elastic.easeOut)
            //TweenLite.to(box, 2.5, { ease: Elastic..config(1, 0.3), x: "400%" });
        };
        StartScreen.prototype.hide = function (callback) {
            var _this = this;
            TweenMax.to(game.dom.query("#github")[0].node, 0.39, { opacity: 0 });
            TweenMax.to(this._title.node, 0.3, { top: -100, delay: 0.1 });
            TweenMax.to(this._startbtn.node, 0.5, { top: 100 + game.screen.height, delay: 0.3, onComplete: function () {
                game.stage.removeEventListener(game.canvas.Stage.RESIZED, _this.onresize, _this);
                game.dom.query("#github")[0].hide();
                if (callback)
                    callback();
            }, ease: Back.easeIn.config(2) });
            TweenMax.to(this._aboutbtn.node, 0.5, { top: 100 + game.screen.width, delay: 0.2, ease: Back.easeIn.config(2) });
        };
        StartScreen.prototype.onresize = function () {
            //trace("resize")
            var titletop = game.screen.height / 2 - (alcedo.toValue(this._title.attr("height")) * 1.3);
            TweenMax.to(this._title.node, 0.5, { top: titletop });
            TweenMax.to(this._startbtn.node, 0.5, { top: titletop - 6 });
            TweenMax.to(this._aboutbtn.node, 0.5, { top: titletop }); //
        };
        return StartScreen;
    })(game.GUIScreen);
    game.StartScreen = StartScreen;
})(game || (game = {}));
