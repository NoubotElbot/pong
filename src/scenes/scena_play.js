import Palas from "../gameObjects/palas.js";
class Scene_play extends Phaser.Scene {
    constructor(params) {
        super({ key: 'Scene_play' });

        this.velocity_move = 400;
        this.velocity_ball = 200;

    }

    create() {
        let center_width = this.scale.width / 2;
        let center_height = this.scale.height / 2;

        // Separador
        this.add.image(center_width, center_height, 'separador');

        // Tabla de marcadores
        this.marcador_izq = 0;
        this.marcador_der = 0;
        this.marcador_izq_text = this.add.text(this.scale.width * 0.25, 20, this.marcador_izq, {
            fontSize: "32px",
            fill: "#fff"
        });
        this.marcador_der_text = this.add.text(this.scale.width * 0.75, 20, this.marcador_der, {
            fontSize: "32px",
            fill: "#fff",
            align: "left"
        });

        // Palas
        this.izquierda = new Palas(this, 30, center_height, 'izquierda');
        this.derecha = new Palas(this, this.sys.game.config.width - 30, center_height, 'derecha');

        // Pelota
        this.physics.world.setBoundsCollision(false, false, true, true);
        this.ball = this.physics.add.image(center_width, center_height, 'ball');
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        this.stop_right = false;
        this.stop_left = false;
        this.ball_stop = false;
        this.ball.setVelocityX([-this.velocity_ball, this.velocity_ball][Phaser.Math.Between(0, 1)]);

        // Fisicas
        this.physics.add.collider(this.ball, this.izquierda, this.chocaPala, null, this);
        this.physics.add.collider(this.ball, this.derecha, this.chocaPala, null, this);

        // Controles
        // Pala derecha
        this.cursor = this.input.keyboard.createCursorKeys();

        // Pala izquierda
        this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        this.puntos();
        // Control de las palas
        // Pala derecha
        if (this.cursor.down.isDown) {
            this.derecha.body.setVelocityY(this.velocity_move);
            if (this.ball_stop && this.stop_right) {
                this.ball.setVelocityY(this.velocity_move);
            }
        } else if (this.cursor.up.isDown) {
            this.derecha.body.setVelocityY(-this.velocity_move);
            if (this.ball_stop && this.stop_right) {
                this.ball.setVelocityY(-this.velocity_move);
            }
        } else {
            this.derecha.body.setVelocityY(0);
            if (this.ball_stop && this.stop_right) {
                this.ball.setVelocityY(0);
            }
        }

        // Pala izquierda
        if (this.cursor_S.isDown) {
            this.izquierda.body.setVelocityY(this.velocity_move);
            if (this.ball_stop && this.stop_left) {
                this.ball.setVelocityY(this.velocity_move);
            }
        } else if (this.cursor_W.isDown) {
            this.izquierda.body.setVelocityY(-this.velocity_move);
            if (this.ball_stop && this.stop_left) {
                this.ball.setVelocityY(-this.velocity_move);
            }
        } else {
            this.izquierda.body.setVelocityY(0);
            if (this.ball_stop && this.stop_left) {
                this.ball.setVelocityY(0);
            }
        }

        this.lanzar();
    }

    lanzar() {
        if (this.space.isDown && this.ball_stop) {
            this.ball_stop = false;
            this.ball.setVelocityX(this.stop_left ? this.velocity_ball : -this.velocity_ball);
            this.ball.setVelocityY(Phaser.Math.Between(-120, 120));
        }
    }

    puntos() {
        if (this.ball.x < 0) {
            this.marcador_der++;
            this.marcador_der_text.setText(this.marcador_der);
            this.resetPosition();
            this.ball.setPosition(this.izquierda.x + 10, this.scale.height / 2);
            this.stop_left = true;
            this.stop_right = false;
        }

        if (this.ball.x > this.scale.width) {
            this.marcador_izq++;
            this.marcador_izq_text.setText(this.marcador_izq);
            this.resetPosition();
            this.ball.setPosition(this.derecha.x - 10, this.scale.height / 2);
            this.stop_right = true;
            this.stop_left = false;
        }
    }

    resetPosition() {
        this.izquierda.setPosition(30, this.scale.height / 2);
        this.derecha.setPosition(this.scale.width - 30, this.scale.height / 2);
        this.ball.setVelocityX(0);
        this.ball.setVelocityY(0);
        this.ball_stop = true;
    }

    chocaPala() {
        this.ball.setVelocityY(Phaser.Math.Between(-120, 120));
    }
}
export default Scene_play;
