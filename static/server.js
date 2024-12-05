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
            emptyspace.src = ''
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
                // console.log(e.target.getAttribute('id'))
                //Call a function to check if other square is clicked
                //If so move piece to that square
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
                // console.log(e.target.getAttribute('id'))
                //Call a function to check if other square is clicked
                //If so move piece to that square
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
                // console.log(e.target.getAttribute('id'))
                //Call a function to check if other square is clicked
                //If so move piece to that square
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
                clickRegister(e.target.getAttribute('id'))
            }
        }

        if((i-1) % 10 >= 5){
            const emptyspace = document.createElement('img')
            emptyspace.src = ''
            emptyspace.classList.add('square')
            postPiece.append(emptyspace)
        }
    }
}


function clickRegister(id){
    if(firstClick == 0){
        firstClick = id
        return
    }


    if(game.move({from: firstClick, to: id}) == null){
        console.log("Invalid Move!")
    } else {
        clearBoard()
        console.log(game.ascii())
        setBoard()
    }

    firstClick = undefined
}

function clearBoard(){
    const parent = document.getElementById("id-container")
    while(parent.firstChild){
        parent.firstChild.remove()
    }
}