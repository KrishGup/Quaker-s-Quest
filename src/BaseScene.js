class BaseScene extends Phaser.Scene {
    constructor(key) {
        super({ key });
    }

    preload() {
        // Preload common assets
        
        this.load.image('tiles', 'assets/tiles.png');
        this.load.tilemapTiledJSON('map', 'assets/map.json');
        this.load.image('duck', 'assets/Iconic Animals (Complete Version)/Cartoon (With Stroke)/spr_cartoon_duck_with_stroke.png');
    }

    create() {
        // Create the tilemap and tileset
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tiles');
        const backgroundLayer = map.createLayer('Background', tileset, 0, 0);

        // Create a simple platform
        this.platform = this.add.rectangle(400, 500, 800, 50, 0x00ff00);
        this.physics.add.existing(this.platform, true); // true makes it static

        // Add the duck character
        this.player = this.add.sprite(0, 315, 'duck');
        this.player.setScale(0.5);
        this.physics.add.existing(this.player, false);
        this.player.body.setCollideWorldBounds(true);

        // Enable collision detection between player and platform
        this.physics.add.collider(this.player, this.platform);


        // Adjust the hitbox size and offset
        this.player.body.setSize(this.player.width * 0.6, this.player.height * 0.52);
        this.player.body.setOffset(this.player.width * 0.25, this.player.height * 0.25);

        // Set up cursor keys for jump and attack
        this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Make the camera follow the player horizontally
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setFollowOffset(0, 0); // Adjust the vertical offset if needed
        this.cameras.main.setLerp(0.1, 0); // Smooth follow horizontally, no vertical movement

        // Set camera deadzone to prevent jitter
        this.cameras.main.setDeadzone(this.cameras.main.width * 0.3, this.cameras.main.height);
    }

    update() {
        // Character moves to the right by default
        this.player.body.setVelocityX(100);

        // Jump logic
        if (this.jumpKey.isDown && this.player.body.touching.down) {
            this.player.body.setVelocityY(-300);
        }

        // Attack logic (for now, just log to console)
        if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
            console.log('Attack!');
        }
    }

    reachGoal(player, goal) {
        console.log('Goal reached!');
        // Transition to the next level
        this.scene.start('Level2');
    }
}

export default BaseScene;