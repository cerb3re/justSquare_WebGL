Game = function(canvasId) {
    // Canvas et engine défini ici
    var canvas = document.getElementById(canvasId);
    var engine = new BABYLON.Engine(canvas, true);
    this.engine = engine;

    var _this = this;
    _this.actualTime = Date.now();
    // On initie la scène avec une fonction associée à l'objet Game
    this.scene = this._initScene(engine);
    
    var _player = new Player(_this, canvas);

    var _arena = new Arena(_this);

    // Permet au jeu de tourner
    engine.runRenderLoop(function () {

        // Récuperet le ratio par les fps
        _this.fps = Math.round(1000/engine.getDeltaTime());

        // Checker le mouvement du joueur en lui envoyant le ratio de déplacement
        _player._checkMove((_this.fps)/60);

        _this.scene.render();
        document.addEventListener("keypress", function(event)
        {
            if (event.keyCode === 13)
            {
                // VOIR LE LAUNCH BULLETS
                _player.camera.weapons.launchFire();
             }
        });
        // Si launchBullets est a true, on tire
        if(_player.camera.weapons.launchBullets === true){
            _player.camera.weapons.launchFire();
        }  
    });

    // Ajuste la vue 3D si la fenetre est agrandie ou diminuée
    window.addEventListener("resize", function () {
        if (engine) {
            engine.resize();
        }
    },false);

};



Game.prototype = {
    // Prototype d'initialisation de la scène
    _initScene : function(engine) {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor=new BABYLON.Color3(0.9,0.9,0.9);
        scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
        scene.collisionsEnabled = true;
        return scene;
    },
    renderRockets : function() {
        for (var i = 0; i < this._rockets.length; i++) {
            // On crée un rayon qui part de la base de la roquette vers l'avant
            var rayRocket = new BABYLON.Ray(this._rockets[i].position,this._rockets[i].direction);

            // On regarde quel est le premier objet qu'on touche
            var meshFound = this._rockets[i].getScene().pickWithRay(rayRocket);

            // Si la distance au premier objet touché est inférieure à 10, on détruit la roquette
            if(!meshFound || meshFound.distance < 10){
                // On vérifie qu'on a bien touché quelque chose
                if(meshFound.pickedMesh && !meshFound.pickedMesh.isMain){
                    // On crée une sphere qui représentera la zone d'impact
                    var explosionRadius = BABYLON.Mesh.CreateSphere("sphere", 5.0, 20, this.scene);
                    // On positionne la sphère là où il y a eu impact
                    explosionRadius.position = meshFound.pickedPoint;
                    // On fait en sorte que les explosions ne soient pas considérées pour le Ray de la roquette
                    explosionRadius.isPickable = false;
                    // On crée un petit material orange
                    explosionRadius.material = new BABYLON.StandardMaterial("textureExplosion", this.scene);
                    explosionRadius.material.diffuseColor = new BABYLON.Color3(1,0.6,0);
                    explosionRadius.material.specularColor = new BABYLON.Color3(0,0,0);
                    explosionRadius.material.alpha = 0.8;
                    
                    // Chaque frame, on baisse l'opacité et on efface l'objet quand l'alpha est arrivé à 0
                    explosionRadius.registerAfterRender(function(){
                        explosionRadius.material.alpha -= 0.02;
                        if(explosionRadius.material.alpha<=0){
                            explosionRadius.dispose();
                        }
                    });
                }
                this._rockets[i].dispose();
                // On enlève de l'array _rockets le mesh numéro i (défini par la boucle)
                this._rockets.splice(i,1);
            } else{
                let relativeSpeed = 1 / ((this.fps)/60);
                this._rockets[i].translate(new BABYLON.Vector3(0,0,1),relativeSpeed,0);
            }
            
        };
    },
    renderExplosionRadius : function(){
    },
};

// Page entièrement chargé, on lance le jeu
document.addEventListener("DOMContentLoaded", function () {
    new Game('renderCanvas');
}, false);

// ------------------------- TRANSFO DE DEGRES/RADIANS 
function degToRad(deg)
{
   return (Math.PI*deg)/180
}
// ----------------------------------------------------

// -------------------------- TRANSFO DE DEGRES/RADIANS 
function radToDeg(rad)
{
   // return (Math.PI*deg)/180
   return (rad*180)/Math.PI
}
// ----------------------------------------------------