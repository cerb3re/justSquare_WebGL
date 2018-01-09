/*
 * Used for player interaction
 * 
 * t.chenier 2018
 */

Player = function(game, canvas) {
    // Camera access inside player view
    var _this = this;
    
    this.game = game;
    // initiate the maximum angular vision angle
    this.angularSensibility = 999.888;
    this.axisMovement = [false, false, false, false];
    window.addEventListener("keyup", function(e){
        switch(e.keyCode) {
            case 38:
                _this.axisMovement[0] = false;
                break;
            case 40:
                _this.axisMovement[1] = false;
                break;            
            case 37:
                _this.axisMovement[2] = false;
                break;            
            case 39:
                _this.axisMovement[3] = false;
                break;
        }
    }, false);
    window.addEventListener("keydown", function(e){
        switch(e.keyCode) {
            case 38:
                console.log("38 : up - keydown");
                _this.axisMovement[0] = true;
                break;
            case 40:
                _this.axisMovement[1] = true;
                break;            
            case 37:
                _this.axisMovement[2] = true;
                break;            
            case 39:
                _this.axisMovement[3] = true;
                break;
        }
    }, false);
    // change the camera movement angle in function of the
    // axis mouse movement in a dynamic way.
    window.addEventListener("mousemove", function(e) {
       if(_this.rotEngaged === true){
            _this.camera.rotation.y += e.movementX * 0.001 * (_this.angularSensibility / 250);
            console.log(e.movementX);
            var nextRotationX = _this.camera.rotation.x + (e.movementY * 0.001 * (_this.angularSensibility / 250));

            if (nextRotationX < degToRad(90) && nextRotationX > degToRad(-90)) {
                _this.camera.rotation.x += e.movementY * 0.001 * (_this.angularSensibility / 250);
            }
        }
    }, false);
    
    this._initCamera(this.game.scene, canvas);
    this.controlEnabled = false;
    this._initPointerLock(); 
};

Player.prototype = {
    _initPointerLock : function() {
    var _this = this;
    
    var canvas = this.game.scene.getEngine().getRenderingCanvas();
    canvas.addEventListener("click", function(evt) {
        canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
        if (canvas.requestPointerLock) {
            canvas.requestPointerLock();
        }
    }, false);

    var pointerlockchange = function (event) {
        _this.controlEnabled = (document.mozPointerLockElement === canvas || document.webkitPointerLockElement === canvas || document.msPointerLockElement === canvas || document.pointerLockElement === canvas);
        if (!_this.controlEnabled) {
            _this.rotEngaged = false;
        } else {
            _this.rotEngaged = true;
        }
    };
    
    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
},
    _initCamera : function(scene, canvas) {
        // Camera creation
        this.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(-20, 5, 0), scene);
        this.camera.axisMovement = [false, false, false, false];
        this.isAlive = true;
        this.camera.setTarget(BABYLON.Vector3.Zero());
    }
};
// see why scene not in scope
var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
camera.attachControl(canvas, true);