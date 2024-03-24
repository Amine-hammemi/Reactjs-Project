import React, { useRef, useState } from "react";
import'../index.css'
import { createContext } from "react";
export const themeContext = createContext(null);


const player1 = prompt("username with X ");
const player2 = prompt("username with O ");


const Rendersquare = ()=>{
    let [square , setSquare] = useState (Array(9).fill(null));
    const [test , setTest ] = useState(0);
    let titleRef = useRef(null);
    let [P1score , setP1core ] = useState(0);
    let [P2score , setP2score] = useState(0);
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);
    let box_array = [box1,box2,box3,box4,box5,box6,box7,box8,box9];
    const [theme , setTheme] = useState("default");

    const playing= (e , i ) =>{
        if(test === 0 && square[i]===null){
            //e.target.innerHTML = `<img src='${X}'></img>`;

            e.target.innerHTML = `<h1>X</h1>`;
            const newSquares = [...square];
            newSquares[i] = 'X';
            setSquare(newSquares);
            setTest(1);
            checkwinner(newSquares);
        }
        else if (test === 1 && square[i]===null) {
            
            //e.target.innerHTML =`<img src='${O}'></img>`;
            e.target.innerHTML = `<h1>O</h1>`;
            const newSquares = [...square];
            newSquares[i] = 'O';
            setSquare(newSquares);
            setTest(0);
            checkwinner(newSquares);
            
        }
        else {return ;}
    }
    const reset =() =>{
        titleRef.current.innerHTML = `YEAH , AGAIN`;
        setSquare(Array(9).fill(null));
        box_array.map((e)=>{
            e.current.innerHTML = "" ;
        })
        setTest(0);
    };
    const checkwinner =(square) => {
        const list = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for(let i of list){
            const [a,b,c]= i;
            if (square[a] && square[a] === square[b] && square[a] === square[c]) {
                if(square[a]==="X"){
                    setTest(4);
                    titleRef.current.innerHTML = `CONGRATULATIONS  : ${player1} WINS`;
                    setP1core(++P1score);
                }
            }
            if (square[a] && square[a] === square[b] && square[a] === square[c]) {
                if(square[a]==="O"){
                    setTest(4);
                    titleRef.current.innerHTML = `CONGRATULATIONS  : ${player2} WINS`;
                    setP2score(++P2score);
                }
            }
        }
        return ;
    }

 const changeTheme = (newTheme) => {
  setTheme(newTheme);
};

    return (
        <themeContext.Provider value={{theme , setTheme}}>
        <div className="comp" id={theme}>
            <h2 id="welcome" ref={titleRef}>Ready  to  start  !! </h2>
            <button onClick={()=>changeTheme('dark')} className="mood" id="darkmood"> </button>
            <button onClick={()=>changeTheme('light')} className="mood" id="lightmood">  </button>
            <button onClick={()=>changeTheme('purple')} className="mood" id="purplemood">  </button>
            <div className="board-row">
                <div >
                    <button className="box" ref={box1} onClick={(e)=>playing(e,0)}></button>
                    <button className="box" ref={box2} onClick={(e)=>playing(e,1)}></button>
                    <button className="box" ref={box3} onClick={(e)=>playing(e,2)}></button>
                </div>
                <div >
                    <button className="box" ref={box4} onClick={(e)=>playing(e,3)}></button>
                    <button className="box" ref={box5} onClick={(e)=>playing(e,4)}></button>
                    <button className="box" ref={box6} onClick={(e)=>playing(e,5)}></button>
                </div>
                <div>
                    <button className="box" ref={box7} onClick={(e)=>playing(e,6)}></button>
                    <button className="box" ref={box8} onClick={(e)=>playing(e,7)}></button>
                    <button className="box" ref={box9} onClick={(e)=>playing(e,8)}></button>
                </div>
            </div>
                <br></br>
                <div className="score">
                    <h3 className="players">{player1} : {P1score} VS {P2score} : {player2} </h3>
                </div>
                <div>
                    <button className="reset" onClick={()=>reset()} >PLAY AGAIN  !!</button>
                </div>
            
        </div>
        </themeContext.Provider>

    );
}
export default Rendersquare