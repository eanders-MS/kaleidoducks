class Duck {
    root: affine.Transform;
    sprite: affine.ImageSprite;

    constructor(s: affine.Scene, a: number, d: number, private sign: number) {
        this.root = new affine.Transform();
        this.sprite = new affine.ImageSprite(s, "duck");
        this.sprite.xfrm.parent = this.root;
        this.root.localRot = a;
        this.sprite.xfrm.localPos.x = Fx8(d);
    }

    update() {
        this.root.localRot += 2;
        this.sprite.xfrm.localRot += 4 * this.sign;
    }

    draw() {
        this.sprite.draw();
    }
}

class DuckScene extends affine.Scene {
    ducks: Duck[];

    constructor() {
        super();
        this.ducks = [];
        const duckn = 5;
        let sign = 1;
        let angle = 0;
        const dangle = 360 / duckn;
        const dist = 30;
        for (let i = 0; i < duckn; ++i, angle += dangle) {
            const duck = new Duck(this, angle, dist, sign);
            sign *= -1;
            this.ducks.push(duck);
        }
    }

    update(dt: number) {
        this.ducks.forEach(duck => duck.update());
    }

    draw() {
        this.ducks.forEach(duck => duck.draw());
    }

}

affine.Scene.pushScene(new DuckScene());
