import Palas from "../gameObjects/palas.js";

class Scene_play extends Phaser.Scene {
    constructor(params) {
        super({key: 'Scene_play'});
    }

    create() {
        let center_width = this.sys.game.config.width / 2;
        let center_height = this.sys.game.config.height / 2;

        // Separador
        this.add.image(center_width, center_height, 'separador');

        // Tabla de marcadores
        this.marcador_izq = 0;
        this.marcador_der = 0;
        this.marcador_izq_text = this.add.text(center_width - 50, 20, this.marcador_izq, {
            fontSize: "32px",
            fill: "#fff"
        });
        this.marcador_der_text = this.add.text(center_width + 30, 20, this.marcador_der, {
            fontSize: "32px",
            fill: "#fff"
        });

        // Palas
        this.izquierda = new Palas(this, 30, center_height, 'izquierda');
        this.derecha = new Palas(this, this.sys.game.config.width - 30, center_height, 'derecha');

        // Pelota
        this.physics.world.setBoundsCollision(false, false, true, true);
        this.ball = this.physics.add.image(center_width, center_height, 'ball');
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        this.ball.setVelocityX(-180);

        // Fisicas
        this.physics.add.collider(this.ball, this.izquierda, this.chocaPala, null, this);
        this.physics.add.collider(this.ball, this.derecha, this.chocaPala, null, this);

        // Controles
        // Pala derecha
        this.cursor = this.input.keyboard.createCursorKeys();

        // Pala izquierda
        this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update() {
        this.puntos();

        // Control de las palas
        // Pala derecha
        if (this.cursor.down.isDown) {
            this.derecha.body.setVelocityY(300);
        } else if (this.cursor.up.isDown) {
            this.derecha.body.setVelocityY(-300);
        } else {
            this.derecha.body.setVelocityY(0);
        }

        // Pala izquierda
        if (this.cursor_S.isDown) {
            this.izquierda.body.setVelocityY(300);
        } else if (this.cursor_W.isDown) {
            this.izquierda.body.setVelocityY(-300);
        } else {
            this.izquierda.body.setVelocityY(0);
        }
    }

    puntos() {
        if (this.ball.x < 0) {
            this.marcador_der ++;
            this.marcador_der_text.setText(this.marcador_der);
            this.resetPosition();
            this.ball.setPosition(this.scale.width - 30, this.scale.height/2);
        }

        if (this.ball.x > this.sys.game.config.width) {
            this.marcador_izq ++;
            this.marcador_izq_text.setText(this.marcador_izq);
            this.resetPosition();
            this.ball.setPosition(30, this.scale.height/2);
        }
    }

    resetPosition() {
        console.log('reset');
        this.izquierda.setPosition(30, this.scale.height/2);
        this.derecha.setPosition(this.scale.width - 30, this.scale.height/2);
    }

    chocaPala() {
        this.ball.setVelocityY(Phaser.Math.Between(-120, 120));
    }
}
export default Scene_play;
