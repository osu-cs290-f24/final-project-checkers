let game = Draughts()
console.log(game.ascii())

function setBoard(){
    for(let i = 1; i < 50; i++){
        let temppiece = game.get(i)
        
        if(temppiece =='w'){
            const img = document.createElement('img');
            img.src = 'light.png';
            //Append to container when created
            

            //On click
            onclock = _ => { console.log(i) }
            
        } else if(temppiece == 'b'){
            const img = document.createElement('img');
            img.src = 'dark.png';
            //Append to container when created
            

            //On click
            onclock = _ => { console.log(i) }

        } else if(temppiece == 'W'){
            const img = document.createElement('img');
            img.src = 'dlight.png';
            //Append to the container when created
            

            //On click
            onclock = _ => { console.log(i) }

        } else if(temppiece == 'B'){
            const img = document.createElement('img');
            img.src = 'ddark.png';
            //Append to the container
            

            //On Click
            onclock = _ => { console.log(i) }

        } else if(temppiece == '0'){
            const img = document.createElement('img');
            img.src = '';
        }
    }
}

