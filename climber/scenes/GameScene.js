class GameScene extends Phaser.Scene {
    platforms
    player
    controls
    lastPlatformHeigth
    score
    scoreText

    preload() {
        this.load.image('sky', 'assets/sky.jpg')
        this.load.image('grass', 'assets/grass.png')
        this.load.image('dirt', 'assets/dirt.png')
        this.load.spritesheet('ball', 'assets/ball.png', { frameWidth: 16, frameHeight: 20 })
    }

    create() {
        this.score = 0
        this.scoreText = this.add
                            .text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })
                            .setScrollFactor(0)
                            .setDepth(1)
        this.physics.world.setBounds(0, -10000, 600, 10800)
        this.add.image(300, 400, 'sky').setScrollFactor(0)

        //Platforms
        this.platforms = this.physics.add.staticGroup()
        const p = this.platforms.create(300, 800, 'grass').setScale(13, 1).refreshBody()
        p.wasBounced = true
        
        this.lastPlatformHeigth = 800

        //Player
        this.player = this.physics.add
            .sprite(100, 700, 'ball', 0)
            .setScale(2)
            .setDepth(1)
            .setCollideWorldBounds(true)
        this.player.body.checkCollision.left = false
        this.player.body.checkCollision.right = false
        this.player.body.checkCollision.up = false
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
        this.physics.add.collider(this.player, this.platforms, (a,b)=>{
            if(b != this.player && !b.wasBounced){
                b.wasBounced = true
                this.score++
                this.scoreText.setText(`score: ${this.score}`)
            } 
        })

        //Controls
        this.controls = this.input.keyboard.addKeys('W,A,S,D,SPACE,LEFT,RIGHT,UP,DOWN')
        this.cameras.main.setBounds(0, -10000, 600, 10800)

        //DEBUG
        //PhaserGUIAction(this)
    }

    update() {
        // Player movement
        if (this.controls.LEFT.isDown || this.controls.A.isDown) {
            this.player.setVelocityX(-300)
            this.player.setFlipX(true)

        } else if (this.controls.RIGHT.isDown || this.controls.D.isDown) {
            this.player.setVelocityX(300)
            this.player.setFlipX(false)
        } else {
            this.player.setVelocityX(0)
        }

        if (this.controls.SPACE.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-270)
            this.player.anims.play('ball-jump')
            this.player.isFalling = true
        }
        if (this.controls.DOWN.isDown || this.controls.S.isDown) {
            this.player.setVelocityX(0)
            this.player.setVelocityY(750)
        }
        if (!this.player.anims.isPlaying && this.player.isFalling && this.player.body.onFloor()) {
            this.player.anims.play('ball-land')
            this.player.isFalling = false
        }

        //Camera
        if (this.player.y < this.cameras.main.scrollY + this.cameras.main.height / 2) {
            this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2
        }
        if (this.cameras.main.scrollY < this.lastPlatformHeigth) {
            this.spawnPlatform()
        }

    }

    spawnPlatform(y) {
        const _x = Phaser.Math.Between(0, 600)
        const _y = y || this.lastPlatformHeigth - 100

        const platform = this.platforms
                            .create(_x, _y, 'grass')
                            .setScale(4, 1)
                            .refreshBody()
        platform.wasBounced = false
        this.lastPlatformHeigth = _y
    }
}