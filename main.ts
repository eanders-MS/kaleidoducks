class Duck {
    root: affine.Transform;
    sprite: affine.ImageSprite;

    constructor(s: affine.Scene, a: number, d: number, private sign: number) {
        this.root = new affine.Transform();
        this.root.parent = s.xfrm;
        this.sprite = new affine.ImageSprite(s, "duck");
        this.sprite.xfrm.parent = this.root;
        this.root.localRot = a;
        this.sprite.xfrm.localPos.x = Fx8(d);
    }

    update(dt: number) {
        this.root.localRot += 1.5;
        this.sprite.xfrm.localRot += 3.5 * this.sign;
        const s = Fx.add(Fx8(1), Fx.mul(Fx8(0.25), affine.trig.sin(this.sign * control.millis() / 10)));
        this.root.localScl.set(s, s);
    }

    draw() {
        this.sprite.draw();
    }
}

class DuckScene extends affine.Scene {
    ducks: Duck[];
    duckn: number;

    constructor() {
        super();
        this.duckn = 6;
    }

    startup() {
        this.createDucks();
        controller.setRepeatDefault(0, 0);
        controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
            this.duckn += 2;
            this.createDucks();
        });
        controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
            this.duckn -= 2;
            this.duckn = Math.max(this.duckn, 0);
            this.createDucks();
        });
    }

    createDucks() {
        this.ducks = [];
        const dangle = 360 / this.duckn;
        const dist = 30;
        let sign = 1;
        let angle = 0;
        for (let i = 0; i < this.duckn; ++i, angle += dangle) {
            const duck = new Duck(this, angle, dist, sign);
            sign *= -1;
            this.ducks.push(duck);
        }
    }

    update(dt: number) {
        this.ducks.forEach(duck => duck.update(dt));
    }

    draw() {
        this.ducks.forEach(duck => duck.draw());
    }

}

affine.Scene.pushScene(new DuckScene());
