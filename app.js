class Game{

  user = 1;
  current = document.querySelector(`#player${this.user} .current p:nth-child(2)`);
  currentValue = [0, 0];
  global = document.querySelector(`#player${this.user} .global`);
  globalValue = [0, 0];
  rollDice = document.getElementById('rollDice');
  diceValue = 0;


  displayCurrent(){
    this.currentValue[this.user - 1] += this.diceValue;
    this.current.textContent = this.currentValue[this.user - 1];
  }

  hold(){
    this.globalValue += this.currentValue
    this.global.textContent = this.globalValue;
  }

  randomNumber(){
    this.diceValue = Math.floor(Math.random() * 6) + 1;
    return this.diceValue;
  }

  resetDice(){
    const diceFace = document.querySelectorAll('.diceFace');
    diceFace.forEach(e=>e.style.display = "none")
  }

  displayDice(){
    this.resetDice();
    document.getElementById(`nbr${this.randomNumber()}`).style.display = "block"
  }

  userChange(){
    if(this.user === 1){
      this.user = 2;
      this.current = document.querySelector(`#player${this.user} .current p:nth-child(2)`);
    }else{
      this.user = 1;
      this.current = document.querySelector(`#player${this.user} .current p:nth-child(2)`);
    }
  }

  currentReset(){
    this.currentValue[this.user - 1] = 0;
    this.current.textContent = 0;
  }

  evalDiceValue(){
    this.displayDice();
    if(this.diceValue === 1){
      this.currentReset();
      this.userChange();
    }else{
      this.displayCurrent();
    }
  }

}


const game = new Game();


game.rollDice.addEventListener('click', ()=>{
  game.evalDiceValue();
})