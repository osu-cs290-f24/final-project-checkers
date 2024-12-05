let game = Draughts()
console.log(game.ascii())

function setBoard(){
    for(let i = 1; i < 50; i++){
        let temppiece = game.get(i)
        
        if(temppiece =='w'){
            const img = document.createElement('img');
            img.src = 'light.png';
            //Append to container when created
            const postPiece = document.createElement('div');
            postPiece.classList.add()//Container name here

            //On click
            onclick = _ => {
                console.log(i);
                //Call a function to check if other square is clicked
                //If so move piece to that square
            }
            
        } else if(temppiece == 'b'){
            const img = document.createElement('img');
            img.src = 'dark.png';
            //Append to container when created
            postPiece.classList.add()//Container name here
            
            //On click
            onclick = _ => {
                console.log(i);
                //Call a function to check if other square is clicked
                //If so move piece to that square
            }

        } else if(temppiece == 'W'){
            const img = document.createElement('img');
            img.src = 'dlight.png';
            //Append to the container when created
            postPiece.classList.add()//Container name here

            //On click
            onclick = _ => {
                console.log(i);
                //Call a function to check if other square is clicked
                //If so move piece to that square
            }

        } else if(temppiece == 'B'){
            const img = document.createElement('img');
            img.src = 'ddark.png';
            //Append to the container
            postPiece.classList.add()//Container name here

            //On Click
            onclick = _ => {
                console.log(i);
                //Call a function to check if other square is clicked
                //If so move piece to that square
            }

        } else if(temppiece == '0'){
            const img = document.createElement('img');
            img.src = '';
        }
    }
}

