/*
 * t.chenier Arena engine
 * here are the graphical object values.
 */

Arena = function(game) {
    this.game       = game;
    
    var materialGround = new BABYLON.StandardMaterial("groundTexture", scene);
    materialGround.diffuseTexture = new BABYLON.Texture("assets/images/floor.jpg", scene);
    // uScale : height
    materialGround.diffuseTexture.uScale = 4.0;
    materialGround.diffuseTexture.vScale = 4.0;
    
    var materialObject = new BABYLON.StandardMaterial("objectTexture", scene);
    materialObject.diffuseTexture = new BABYLON.Texture("assets/images/object.jpg");
    
    var scene       = game.scene;
    var light       = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    var ground      = new BABYLON.Mesh.CreateGround("ground1", 20, 20, 2, scene);   
    var mainBox     = BABYLON.Mesh.CreateBox("box1", 3, scene);
    var mainBox2    = mainBox.clone("box2"); 
    var mainBox3    = mainBox.clone("box3"); 
    var mainBox4    = mainBox.clone("box4");
    var cylinder    = BABYLON.Mesh.CreateCylinder("cyl1", 20, 5, 5, 20, 4, scene);
    
    // initial size: 3
    // every initial scale object are mapped by there vertex center and must be 
    // multiplie by the double of there divided center.
    mainBox.scaling.y   = 1;
    mainBox.position    = new BABYLON.Vector3(5,((3 / 2) * mainBox.scaling.y), 5);
    mainBox.rotation.y  = (Math.PI * 45 / 180);
    mainBox.material    = materialObject;
    
    mainBox2.scaling.y  = 2;
    mainBox2.position   = new BABYLON.Vector3(5,((3/2)*mainBox2.scaling.y),-5);
    mainBox2.rotation.x = mainBox.rotation.y;
    mainBox2.material   = materialObject;


    mainBox3.scaling.y  = 3;
    mainBox3.position   = new BABYLON.Vector3(-5,((3/2)*mainBox3.scaling.y),-5);
    mainBox3.material   = materialObject;

    mainBox4.scaling.y  = 4;
    mainBox4.position   = new BABYLON.Vector3(-5,((3/2)*mainBox4.scaling.y),5);
    mainBox4.material   = materialObject;

    cylinder.position.y = 20/2;
    cylinder.material   = materialObject;
    
    ground.scaling      = new BABYLON.Vector3(2, 10, 3);
    ground.scaling.z    = 2;
    ground.material     = materialGround;

};

