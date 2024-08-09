let score = JSON.parse(localStorage.getItem('score'));

    if(score === null){
        score = {
            wins: 0,
            losses: 0,
            ties: 0
        };
    }
    
   updateScoreElem();

   let isAutoPlay = false;
   let intervalId;

   function autoPlay(){

    if(!isAutoPlay){
        intervalId = setInterval( function() {
            const playerMove = pickCompMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlay = true;
    }
    else {
        clearInterval(intervalId);
        isAutoPlay = false;
    }
   }
    
    function playGame(playerMove){
        const CompMove = pickCompMove();

        console.log(CompMove);
        let result = '';

        if(playerMove === 'Scissors') {
            if(CompMove === 'Rock'){
                result = 'You Lose';
            }
            else if(CompMove === 'Paper'){
                result = 'You Win';
            }
            else if(CompMove === 'Scissors'){
                result = 'Tie';
            }
        }

        else if(playerMove === 'Paper'){
            if(CompMove === 'Rock'){
                result = 'You Win';
            }
            else if(CompMove === 'Paper'){
                result = 'Tie';
            }
            else if(CompMove === 'Scissors'){
                result = 'You Lose';
            }
        }

        else if(playerMove === 'Rock'){
            if(CompMove === 'Rock'){
                result = 'Tie';
            }
            else if(CompMove === 'Paper'){
                result = 'You Lose';
            }
            else if(CompMove === 'Scissors'){
                result = 'You Win';
            }  
        }

        if(result === 'You Win' ){
            score.wins = score.wins + 1;
        }
        else if(result ==='You Lose'){
            score.losses = score.losses + 1;
        }
        else if(result ==='Tie'){
            score.ties = score.ties + 1;
        }


        localStorage.setItem('score', JSON.stringify(score));

        updateScoreElem();

        document.querySelector('.js-result').innerHTML = result;

        document.querySelector('.js-moves').innerHTML = ` You
        <img src="images RPS/${playerMove}-emoji.png" class="move-icon">
        <img src="images RPS/${CompMove}-emoji.png" class="move-icon">
        Computer`;

    }

    function updateScoreElem(){
        document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    }
    
    function pickCompMove(){
        const RandomNum = Math.random();
        let CompMove = '';
        if(RandomNum >= 0 && RandomNum < 1/3){
            CompMove = 'Rock';
        }
        else if(RandomNum >= 1/3 && RandomNum < 2/3){
            CompMove = 'Paper';
        }
        else if(RandomNum >= 2/3 && RandomNum < 1){
            CompMove = 'Scissors';
        }
        return CompMove;
    }