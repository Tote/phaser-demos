class GameScene extends Phaser.Scene {
    platforms
    player
    controls

    preload() {
        this.load.image('sky', 'assets/sky.jpg')
        this.load.image('grass', 'assets/grass.png')
        this.load.image('dirt', 'assets/dirt.png')
    }

    create() {
        this.add.image(300, 400, 'sky')

        //Platforms
        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(312, 800, 'grass').setScale(13, 1).refreshBody()
        this.platforms.create(312, 700, 'grass').setScale(4, 1).refreshBody()
        this.platforms.create(0, 600, 'grass').setScale(4, 1).refreshBody()
        this.platforms.create(312, 500, 'grass').setScale(4, 1).refreshBody()
        this.platforms.create(600, 400, 'grass').setScale(4, 1).refreshBody()

        //Player
        this.player = this.physics.add.image(0, 764, 'dirt')
        this.player.body.checkCollision.left = false
        this.player.body.checkCollision.right = false
        this.player.body.checkCollision.up = false
        //Collisions
        this.player.setCollideWorldBounds(true)

        this.physics.add.collider(this.player, this.platforms)

        //Controls
        this.controls = this.input.keyboard.addKeys('W,A,S,D,SPACE,LEFT,RIGHT,UP,DOWN')
    }

    update() {
        // Player movement
        if (this.controls.LEFT.isDown || this.controls.A.isDown) {
            this.player.setVelocityX(-250)

        } else if (this.controls.RIGHT.isDown || this.controls.D.isDown) {
            this.player.setVelocityX(250)
        } else {
            this.player.setVelocityX(0)
        }

        if (this.controls.SPACE.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-250)
        }
        if (this.controls.DOWN.isDown || this.controls.S.isDown) {
            this.player.setVelocityX(0)
            this.player.setVelocityY(750)
        }

    }
}