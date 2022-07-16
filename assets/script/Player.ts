import { _decorator, Component, Node, input, Event, Input, EventTouch, v3, UITransform, Prefab, instantiate, director,
     Contact2DType, Collider2D, AnimationClip, NodePool, Pool, IPhysics2DContact, Animation, AudioSource } from 'cc';
import { Bullet } from './Bullet';
import { Global } from './Global';
import { Game } from './Game';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property({type: Prefab})
    bulletPre:Prefab

    global:Global = Global.getInstance();

    isDie: boolean = false;

    @property({type:Node})
    ganmeNode:Node=null;

    animation: Animation = null;

    audio: AudioSource = null;

    start() {

    }

    init(){
        this.node.setPosition(v3(0,-320,0))
        this.animation.play('plant-normal');
        this.isDie = false;
    }

    touchMove(event: EventTouch) {
        let pos = this.node.position
        let move = event.getDelta()
        // console.log(move, pos)
        if(this.global.isPuase == false){
            this.node.setPosition(v3(move.x+ pos.x, move.y + pos.y, 0))
        }
    }

    // 发射子弹
    shoot(){
        // 游戏暂停时不发射子弹
        if(this.global.isPuase == true || this.global.isGameOver == true)
            return
        
        // console.log('发射')
        let bullet = this.global.createBullet(this.bulletPre)
        
        let pos = this.node.position
        // console.log(pos)
        let parent = this.node.parent
        parent.addChild(bullet)
        bullet.setPosition(pos.x, pos.y + 80)
        // director.getScene().addChild(bullet)
    }

    onLoad(){
        const that = this
        this.audio = this.node.getComponent(AudioSource)
        this.animation = this.node.getComponent(Animation);

        // 定时射击
        this.schedule(function(){
            that.shoot()
        }, 0.2)

        //注册Touch事件
        input.on(Input.EventType.TOUCH_MOVE, this.touchMove, this);

        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        // console.log(collider)
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // console.log('onBeginContact');
        //与敌机碰撞
        if(otherCollider.tag == 2){
            this.hit()
            this.global.isGameOver = true
            this.ganmeNode.getComponent(Game).gameOver()
        }
    }

    hit(){
        if(this.isDie == false){
            this.animation.play('plane-die')
            this.isDie = true
        }
    }

    die(){
        this.animation.resume();
        this.audio.playOneShot(this.audio.clip, 0.6)
        this.node.setPosition(v3(0,1000,0))
        this.isDie = false
    }

    onDestroy(){
        input.off(Input.EventType.TOUCH_MOVE, this.touchMove, this);
    }

    update(deltaTime: number) {
        
    }
}

