class Game{

  //propriétés de classe
  user = 1; //gère les joueurs
  current = document.querySelector(`#player${this.user} .current p:nth-child(2)`); //récupère l'élément html qui affiche la valeur courante
  currentValue = [0, 0];//stocke les valeurs courante de dchaque joueur
  global = document.querySelector(`#player${this.user} .global`);//récupère l'élement html qui affiche la valeur global
  globalValue = [0, 0];//stocke la valeur global de chaque joueur
  rollDice = document.getElementById('rollDice');//récupère l'élement html qui affiche le dé
  diceValue = 0;//stocke la valeur du dé après un lancé
  hold = document.getElementById('hold');//récupère l'élement html hold 
  turn = document.getElementById(`user${this.user}`);//récupère l'élement html qui indique visuellement quel joueur est en train de jouer
  newGame = document.getElementById('newGame');

  //affiche la valeur courante du joueur en cours
  displayCurrent(){
    this.currentValue[this.user - 1] += this.diceValue;
    this.current.textContent = this.currentValue[this.user - 1];
  }

  //génère un nombre aléatoire entre 1 et 6
  randomNumber(){
    this.diceValue = Math.floor(Math.random() * 6) + 1;
    return this.diceValue;
  }
  
  //fait un reset du visuel du dé
  resetDice(){
    const diceFace = document.querySelectorAll('.diceFace');
    diceFace.forEach(e=>e.style.display = "none")
  }
  
  //afiche le visuel du dé en fonction de la valeur retourné de la méthode randomNumber()
  displayDice(){
    this.resetDice();
    document.getElementById(`nbr${this.randomNumber()}`).style.display = "block"
  }
  
  //permet le changement de joueur en réaffectant les propriétés en fonctions de la valeur de user
  userChange(){
    if(this.user === 1){
      this.turn.style.display = "none";
      this.user = 2;
      this.current = document.querySelector(`#player${this.user} .current p:nth-child(2)`);
      this.global = document.querySelector(`#player${this.user} .global`);
      this.turn = document.getElementById(`user${this.user}`);
      this.turn.style.display = "block";
    }else{
      this.user = 1;
      this.turn.style.display = "none";
      this.current = document.querySelector(`#player${this.user} .current p:nth-child(2)`);
      this.global = document.querySelector(`#player${this.user} .global`);
      this.turn = document.getElementById(`user${this.user}`);
      this.turn.style.display = "block";
    }
  }
  
  //fait un reset de la valeur courante
  currentReset(){
    this.currentValue[this.user - 1] = 0;
    this.current.textContent = 0;
  }
  
  //effactue un reset de la valeur courante de un changement de joueur si le joeur fait 1 au dé
  evalDiceValue(){
    this.displayDice();
    if(this.diceValue === 1){
      this.currentReset();
      this.userChange();
    }else{
      this.displayCurrent();
    }
  }

  //véfifie la valeur de global après un hold pour savoir s'il faut juste changer de joueur ou si c'est gagné
  evalGlobal(){
    this.displayGlobal();
    if(this.globalValue[this.user - 1] >= 100){
      document.getElementById('winner').textContent = `PLAYER ${this.user} WON`;
    }else{
      this.currentReset();
      this.userChange();
      }
    }

    //affiche la valeur global du joueur en cours
    displayGlobal(){
      this.global.textContent = this.globalValue[this.user - 1];
    }
    
    //incrémente la valeur global et affiche la nouvelle valeur
    holdEvent(){
      this.globalValue[this.user - 1] += this.currentValue[this.user - 1];
      this.evalGlobal();
    }

    // fait un reset global du joueur 1
    globalResetUserOne(){
      this.user = 1;
      this.globalValue[this.user - 1] = 0;
      this.global = document.querySelector(`#player${this.user} .global`);
      this.displayGlobal();
    }
    // fait un reset global du joueur 2
    globalResetUserTwo(){
      this.user = 2;
      this.globalValue[this.user - 1] = 0;
      this.global = document.querySelector(`#player${this.user} .global`);
      this.displayGlobal();
    }
    
    // remet toutes les valeurs et leurs éléments visuel à l'état originel
    new(){
      this.resetDice();
      this.currentReset();
      this.globalResetUserOne();
      this.globalResetUserTwo();
      this.userChange();
    }
}

//créé une instance game de la classe Game
const game = new Game();

// déclenche la méthode evalDiceValue() au click sur l'élement rollDice
game.rollDice.addEventListener('click', ()=>{
  game.evalDiceValue();
});

// déclenche la méthode holdEvent() au click sur l'élement hold
game.hold.addEventListener('click', ()=>{
  game.holdEvent();
});

// déclenche la méthode nex() au click sur l'élement newGame
game.newGame.addEventListener('click', ()=>{
  game.new();
})