Robot = function( x, y, z ) {

    //Skin the robot
    // create head, neck and torso
    var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 0x625C54 );
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.root = bones[0];  // invisible anchor point
    this.root.position.set( x, y, z );

    this.head = bones[1];
    this.neck = bones[2];
    this.neck.position.y = -10;
    this.torso = bones[3];

    this.torso.position.y = -30;
    this.body_mesh = mesh;
    // end of head, neck, and torso

    // Begin with the left arm
    var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 0x625C54 );
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.neck.add( bones[0] );  // invisible anchor point

    this.left_upper_arm = bones[1];
    this.left_upper_arm.position.x = 10;
    this.left_upper_arm.position.y = -5;

    this.left_lower_arm = bones[2];
    this.left_lower_arm.position.x = 8;
    this.left_lower_arm.position.y = -18;

    this.left_hand = bones[3];
    this.left_hand.position.x = -1;
    this.left_hand.position.y = -5;

    this.leftarm_mesh = mesh;
    // end of left arm

    // Then the right arm
    var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 0x625C54 );
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.neck.add( bones[0] );  // invisible anchor point

    this.right_upper_arm = bones[1];
    this.right_upper_arm.position.x = -10;
    this.right_upper_arm.position.y = -5;

    this.right_lower_arm = bones[2];
    this.right_lower_arm.position.x = -8;
    this.right_lower_arm.position.y = -18;

    this.right_hand = bones[3];
    this.right_hand.position.x = 1;
    this.right_hand.position.y = -5;

    this.rightarm_mesh = mesh;
    // end of right arm

    // Start of left leg
    var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 0x625C54 );
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.torso.add( bones[0] );  // invisible anchor point

    this.left_upper_leg = bones[1];
    this.left_upper_leg.position.x = 8;
    this.left_upper_leg.position.y = -18;

    this.left_lower_leg = bones[2];
    this.left_lower_leg.position.y = -25;

    this.left_foot = bones[3];
    this.left_foot.position.x = 6;
    this.left_foot.position.y = 2;

    this.leftleg_mesh = mesh;
    // end of left leg

    // Then the right leg
    var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 0x625C54 );
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.torso.add( bones[0] );  // invisible anchor point

    this.right_upper_leg = bones[1];
    this.right_upper_leg.position.x = -8;
    this.right_upper_leg.position.y = -18;

    this.right_lower_leg = bones[2];
    this.right_lower_leg.position.y = -25;

    this.right_foot = bones[3];
    this.right_foot.position.x = -6;
    this.right_foot.position.y = 2;

    this.rightleg_mesh = mesh;
    // end of right leg

    // // this will control which animation to run
    this.movement = null; // for instance 'raise left arm', 
                            // raises the left arm

};

Robot.prototype.show = function(scene) {

    scene.add( this.body_mesh );
    scene.add( this.leftarm_mesh );
    scene.add( this.rightarm_mesh );
    scene.add( this.leftleg_mesh );
    scene.add( this.rightleg_mesh );

};

Robot.prototype.raiseLeftArm = function() {
    
    this.movement = 'raise left arm';

};

Robot.prototype.lowerLeftArm = function() {
    
    this.movement = 'lower left arm';

};

Robot.prototype.kick = function() {
    
    this.movement = 'kick';

};

Robot.prototype.walk = function() {
    
    this.movement = 'walk';

};

Robot.prototype.dance = function() {
    
    this.movement = 'dance';

};

// adapted from Loraine code.
Robot.prototype.onStep = function() {

    if ( this.root.position.z > 500 || this.root.position.z < -500 ) {
      this.root.rotateY( Math.PI / 2 );
    } 
    else if ( this.root.position.x > 500 || this.root.position.x < -500 ) {
          this.root.rotateY( Math.PI / 2 );
    }
    
    // bonus part 2
    // avoid robots hit bounding box of geometry
    if ( this.root.position.x > -450 && this.root.position.x < -150 
        && this.root.position.z > 150 && this.root.position.z < 450 )
    {
        this.root.rotateY(Math.PI / 4);
    }

    for ( var i in all_robots ) {
        i = all_robots[i];

        if ( i.root.position.equals(this.root.position) ) {
            continue;
        }
        if ( i.root.position.distanceTo(this.root.position) < 25 ) {
            this.root.rotateY( Math.PI / 2 );
        }
    }
    
    this.root.translateZ(10);

};

Robot.prototype.onAnimate = function() {

    // gets called on each animate loop
    // meaning on every frame
    // check which movement is requested
    if( this.movement == 'raise left arm' ) {

        // front raise the left arm
        var T = Math.PI;
        var x = Math.sin( T/2 )
        var y = 0
        var z = 0
        var w = Math.cos( T/2 )    

        r.left_upper_arm.quaternion.slerp( new THREE.Quaternion( x, y, z, -w ), 0.1 );

    } else if( this.movement == 'lower left arm' ) {

        // lower the left arm using the identity quaternion
        r.left_upper_arm.quaternion.slerp( new THREE.Quaternion( 0, 0, 0, -1 ), 0.1 );

    } else if( this.movement == 'kick' ) {

        // animate a right kick
        // check if the slerp has almost reached its end
        if( this.right_upper_leg.quaternion.w < 0.87 ) {
            // signal that the kick is done and the leg should move back
            this.movement = 'kick done';
        } else {
            // forward kick with the right leg
            var T = Math.PI/3;
            var x = Math.sin( T/2 )
            var y = 0
            var z = 0
            var w = Math.cos( T/2 )
            
            r.right_upper_leg.quaternion.slerp( new THREE.Quaternion( x, y, z, -w ), 0.1 );
        }

    } else if( this.movement == 'kick done' ) {

        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( 0, 0, 0, 1 ), 0.1 );

    } else if ( this.movement == 'walk' ) {

        if( this.right_upper_leg.quaternion.w < 0.93 ) {
            this.movement = 'walk2';
        }
    
        this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( 0, 0, 0, 1 ), 0.1 );

        var T = -Math.PI/4; // 90 degrees
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ), 0, 
                                                                    0, Math.cos( T / 2 ) ), 
                                                                    0.05 );
        this.onStep();
    
    } else if ( this.movement == 'walk2' ) {
    
        if( this.left_upper_leg.quaternion.w < 0.93 ) {
            this.movement = 'walk';
        }
    
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( 0, 0, 0, 1), 0.1 );

        var T = -Math.PI/4; // 90 degrees
        this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ), 0, 
                                                                    0, Math.cos( T / 2 ) ), 
                                                                    0.05 );
        this.onStep();

    } else if( this.movement == 'dance' ) {

        if( typeof this.dancer === 'undefined' ) {

            this.dancer = setInterval( function() {

                // some random translation
                var shaketorso = 3*Math.random();
                if( Math.random() < .5 ) {
                    shaketorso *= -1;
                }
                this.torso.position.x += shaketorso;

                var shakeneck = 3*Math.random();
                if( Math.random() < 0.5 ) {
                    shakeneck *= -1;
                }
                this.neck.position.x += shakeneck;

                var shakehead = 3*Math.random();
                if( Math.random() < 0.5 ) {
                    shakehead *= -1;
                }
                this.head.position.x += shakehead;

                // use actions
                if( Math.random() < .3 ) {
                    this.raiseLeftArm();
                }

                if( Math.random() < .3 ) {
                    this.lowerLeftArm();
                }

                if( Math.random() < .3 ) {
                    this.kick();
                }

                if( Math.random() < .3 ) {
                    this.movement = 'kick done';
                }

            }.bind( this ), 500);

        }

    }

}