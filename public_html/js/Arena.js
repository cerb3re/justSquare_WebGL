/*
 * t.chenier Arena engine
 * here are the graphical object values.
 */

Arena = function(game) {
    this.game       = game;
    
    var scene       = game.scene;
    var light       = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    var ground      = new BABYLON.Mesh.CreateGround("ground1", 20, 20, 2, scene);
    var mainBox     = BABYLON.Mesh.CreateBox("box1", 3, scene);
    var mainBox2    = mainBox.clone("box2"); 
    var mainBox3    = mainBox.clone("box3"); 
    var mainBox4    = mainBox.clone("box4");
    var cylinder    = BABYLON.Mesh.CreateCylinder("cyl1", 20, 5, 5, 20, 4, scene);
    
    ground.scaling  = new BABYLON.Vector3(2, 2, 3);
    
    // initial size: 3
    // every initial scale object are mapped by there vertex center and must be 
    // multiplie by the double of there divided center.
    mainBox.scaling.y   = 1;
    mainBox.position    = new BABYLON.Vector3(5,((3 / 2) * mainBox.scaling.y), 5);
    mainBox.rotation.y  = (Math.PI * 45 / 180);
    
    mainBox2.scaling.y = 2;
    mainBox2.position = new BABYLON.Vector3(5,((3/2)*mainBox2.scaling.y),-5);

    mainBox3.scaling.y = 3;
    mainBox3.position = new BABYLON.Vector3(-5,((3/2)*mainBox3.scaling.y),-5);

    mainBox4.scaling.y = 4;
    mainBox4.position = new BABYLON.Vector3(-5,((3/2)*mainBox4.scaling.y),5);

    cylinder.position.y = 20/2;

};

