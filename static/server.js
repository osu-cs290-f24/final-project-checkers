let game = Draughts();
console.log(game.ascii())
setBoard()

var firstClick = 0;

function setBoard(){
    for(let i = 1; i < 51; i++){
        let temppiece = game.get(i)
        const postPiece = document.getElementById('id-container')
        
        if((i-1) % 10 < 5){
            const emptyspace = document.createElement('img')
            emptyspace.alt = ''
            emptyspace.classList.add('square')
            postPiece.append(emptyspace)
        }
        if(temppiece =='w'){
            const img = document.createElement('img')
            img.src = 'light.png'

            img.classList.add('square')
            img.setAttribute('id', i)

            //Append to container when created
            postPiece.append(img)
            

            //On click
            img.onclick = (e) => {
                //High light clicked on piece/square
                img.classList.add("highlight")
                //Collect Id of clicked on piece/square
                clickRegister(e.target.getAttribute('id'))
            }
            
        } else if(temppiece == 'b'){
            const img = document.createElement('img')
            img.src = 'dark.png'

            img.classList.add('square')
            img.setAttribute('id', i)

            //Append to container when created
            postPiece.append(img)
            
            //On click
            img.onclick = (e) => {
                //High light clicked on piece/square
                img.classList.add("highlight")
                //Collect Id of clicked on piece/square
                clickRegister(e.target.getAttribute('id'))
            }

        } else if(temppiece == 'W'){
            const img = document.createElement('img')
            img.src = 'dlight.png'
            
            img.classList.add('square')
            img.setAttribute('id', i)

            //Append to the container when created
            postPiece.append(img)

            //On click
            img.onclick = (e) => {
                //High light clicked on piece/square
                img.classList.add("highlight")
                //Collect Id of clicked on piece/square
                clickRegister(e.target.getAttribute('id'))
            }

        } else if(temppiece == 'B'){
            const img = document.createElement('img')
            img.src = 'ddark.png'

            img.classList.add('square')
            img.setAttribute('id', i)

            //Append to the container
            postPiece.append(img)

            //On Click
            img.onclick = (e) => {
                // console.log(e.target.getAttribute('id'))
                //Call a function to check if other square is clicked
                //If so move piece to that square
                img.classList.add("highlight")
                clickRegister(e.target.getAttribute('id'))
            }

        } else if(temppiece == '0'){
            const img = document.createElement('img')
            img.src = ''

            img.classList.add('square')
            img.setAttribute('id', i)

            postPiece.append(img)

            img.onclick = (e) => {
                console.log(e.target.getAttribute('id'))
                //Call a function to check if other square is clicked
                //If so move piece to that square
                img.classList.add("highlight")
                clickRegister(e.target.getAttribute('id'))
            }
        }
        
        //Depending on row, print empty spaces first, or pieces first
        if((i-1) % 10 >= 5){
            const emptyspace = document.createElement('img')
            emptyspace.alt = ''
            emptyspace.classList.add('square')
            postPiece.append(emptyspace)
        }
    }
}

//Function to check when click is done for move
function clickRegister(id){
    //If first click, set to id of clicked space
    if(firstClick == 0){
        firstClick = id
        return
    }

    //Check if the move is valid (This will execute the move as well). If not reset the board but don't move piece
    if(game.move({from: firstClick, to: id}) == false){
        console.log("Invalid Move!")
        clearBoard()
        setBoard()
    } else {
        // If move is valid, move the ai Pieces and reset the board
        console.log(game.ascii())
        clearBoard()
        aiMove(id)
    }
    
    firstClick = 0;
}

//Function for AI move
function aiMove(id){
    //Fetch for backend to get proper move
    fetch("/api/getMove",{
        method: "POST",
        body: JSON.stringify({fen: game.fen()}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }   
    }).then((res) => {
        //Wait for response then move and set the game board
        res.json().then(move => {
            game.move(move)
            setBoard()
        })
    })
}

//Clears the board
function clearBoard(){
    const parent = document.getElementById("id-container")
    while(parent.firstChild){
        parent.firstChild.remove()
    }
}