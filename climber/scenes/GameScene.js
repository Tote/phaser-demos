class GameScene extends Phaser.Scene {
    platforms
    player
    controls

    preload() {
        this.load.image('sky', 'assets/sky.jpg')
        this.load.image('grass', 'assets/grass.png')
        this.load.image('dirt', 'assets/dirt.png')
        this.load.spritesheet('ball', 'assets/ball.png', { frameWidth: 16, frameHeight: 20 })
    }

    create() {
        this.physics.world.setBounds(0, -10000, 600, 10800)
        this.add.image(300, 400, 'sky')

        //Platforms
        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(312, 800, 'grass').setScale(13, 1).refreshBody()
        this.platforms.create(312, 700, 'grass').setScale(4, 1).refreshBody()
        this.platforms.create(0, 600, 'grass').setScale(4, 1).refreshBody()
        this.platforms.create(312, 500, 'grass').setScale(4, 1).refreshBody()
        this.platforms.create(600, 400, 'grass').setScale(4, 1).refreshBody()
        this.platforms.create(600, 300, 'grass').setScale(4, 1).refreshBody()
        this.platforms.create(400, 200, 'grass').setScale(4, 1).refreshBody()
        this.platforms.create(200, 100, 'grass').setScale(4, 1).refreshBody()
        this.platforms.create(300, 0, 'grass').setScale(4, 1).refreshBody()
        this.platforms.create(500, -100, 'grass').setScale(4, 1).refreshBody()
        this.platforms.create(600, -200, 'grass').setScale(4, 1).refreshBody()
        this.platforms.create(200, -300, 'grass').setScale(4, 1).refreshBody()
        

        //Player
        this.player = this.physics.add.sprite(100, 700, 'ball', 0)
        this.player.setScale(2)
        this.player.body.checkCollision.left   = false
        this.player.body.checkCollision.right  = false
        this.player.body.checkCollision.up     = false
        this.anims.create({
            key: 'ball-jump',
            frames: this.anims.generateFrameNumbers('ball', { start: 8, end: 13 }),
            frameRate: 20,
        });
        this.anims.create({
            key: 'ball-land',
            frames: this.anims.generateFrameNumbers('ball', { start: 1, end: 7 }),
            frameRate: 20,
        });
        this.player.isFalling = false


        //Collisions
        this.player.setCollideWorldBounds(true)

        this.physics.add.collider(this.player, this.platforms)

        //Controls
        this.controls = this.input.keyboard.addKeys('W,A,S,D,SPACE,LEFT,RIGHT,UP,DOWN')
        this.cameras.main.setBounds(0, -10000, 600, 10800)
        //this.cameras.main.startFollow(this.player)
        //this.cameras.main.setDeadzone(600,400)
        window.camerainfo = {
            camera: this.cameras.main.scrollY,
            player: this.player.y, 
        }
    }

    update() {
        // Player movement
        //if(this.player.body.onFloor()){
            if (this.controls.LEFT.isDown || this.controls.A.isDown) {
                this.player.setVelocityX(-250)
                this.player.setFlipX(true)

            } else if (this.controls.RIGHT.isDown || this.controls.D.isDown) {
                this.player.setVelocityX(250)
                this.player.setFlipX(false)
            } else {
                this.player.setVelocityX(0)
            }
        //}

        if (this.controls.SPACE.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-270)
            this.player.anims.play('ball-jump')
            this.player.isFalling = true
        }
        if (this.controls.DOWN.isDown || this.controls.S.isDown) {
            this.player.setVelocityX(0)
            this.player.setVelocityY(750)
        }
        if(!this.player.anims.isPlaying && this.player.isFalling && this.player.body.onFloor()){
            this.player.anims.play('ball-land')
            this.player.isFalling = false
        }

        //Camera
        if(this.player.y < this.cameras.main.scrollY + this.cameras.main.height / 2){
            this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2
        }
      

    }
}