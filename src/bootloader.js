import Phaser from "phaser";
class Bootloader extends Phaser.Scene {
    constructor() {
        super({key: "Bootloader"});
    }

    preload() {
        this.load.on("complete", () => {
            this.scene.start("Scene_play");
        });

        this.load.image("ball", "assets/ball.png");
        this.load.image("izquierda", "assets/left_pallete.png");
        this.load.image("derecha", "assets/right_pallete.png");
        this.load.image("separador", "assets/separator.png");
    }
}
export default Bootloader;
