let piecesData = [
    {id:"wk", code: 0, img: "wk.png", isWhite: 1, dpos: [4, 7], count: 1 },
    { id:"wq" ,code: 1, img: "wq.png", isWhite: 1, dpos: [3, 7], count: 1 },
    { id:"wkn" ,code: 2, img: "wkn.png", isWhite: 1, dpos: [[3, 4], [6, 7]], count: 2 },
    {id:"wb" , code: 3, img: "wb.png", isWhite: 1, dpos: [[2, 7], [5, 7]], count: 2 },
    {id:"wr" , code: 4, img: "wr.png", isWhite: 1, dpos: [[0, 7], [7, 7]], count: 2 },
    {id:"wp" , code: 5, img: "wp.png", isWhite: 1, dpos: 6, count: 8 },
    {id:"b" , code: 0, img: "bk.png", isWhite: 0, dpos: [4, 0], count: 1 },
    { id:"bq" ,code: 1, img: "bq.png", isWhite: 0, dpos: [3, 0], count: 1 },
    {id:"bkn" , code: 2, img: "bkn.png", isWhite: 0, dpos: [[1, 0], [6, 0]], count: 2 },
    {id:"bb" , code: 3, img: "bb.png", isWhite: 0, dpos: [[2, 0], [5, 0]], count: 2 },
    {id:"br" , code: 4, img: "br.png", isWhite: 0, dpos: [[0, 0], [7, 0]], count: 2 },
    {id:"bp" , code: 5, img: "bp.png", isWhite: 0, dpos: 1, count: 8 },
];

class Game {
    constructor() {
        this.turn = 0;
        this.pieces = piecesData.flatMap((element) => {
            let elementToReturn = [];
            if (element.count == 1) {
                elementToReturn.push({
                    pos: element.dpos,
                    isWhite: element.isWhite,
                    img: element.img,
                    type: element.code,
                    id: `${element.id}1`
                })
            } else if (element.count == 2) {
                elementToReturn.push({
                    pos: element.dpos[0],
                    isWhite: element.isWhite,
                    img: element.img,
                    type: element.code,
                    id: `${element.id}1`
                }, {
                    pos: element.dpos[1],
                    isWhite: element.isWhite,
                    type: element.code,
                    img: element.img,
                    id: `${element.id}2`
                }
                )
            } else {
                for (let i = 0; i < 8; i++) {
                    elementToReturn.push(
                        {
                            pos: [i, element.isWhite ? 6 : 1],
                            isWhite: element.isWhite,
                            img: element.img,
                            type: element.code,
                            id: `${element.id}${i}`
                        }
                    )
                }
            }
            return elementToReturn;
        });
        this.board = Array.from(document.querySelectorAll(".row")).map(
            () => {
                let arrayToReturn = [];
                for (let row = 0; row < 8; row++) {
                    arrayToReturn.push({
                        occupied: 0,
                        piece: null,
                    });
                }
                return arrayToReturn;
            }
        );
        this.initializeBoard();
    }
    initializeBoard() {
        document
            .querySelectorAll(".cell")
            .forEach(
                (e) =>
                    ((e.id % 2 != 0 && e.parentElement.id % 2 == 0) ||
                        (e.id % 2 == 0 && e.parentElement.id % 2 != 0)) &&
                    e.classList.add("blackCell")
            );
        console.log(this.pieces)
        this.pieces.forEach((elm) => {
            document.querySelector(`.row[id='${elm.pos[0] + 1}'] .cell[id='${elm.pos[1] + 1}']`).innerHTML = `<img src="../images/${elm.img}" class="piece" id="${elm.id}"/>`
        })
        document.querySelectorAll(".piece").forEach(elm => elm.addEventListener("click", () => this.returnAv(elm.id)))
        this.pieces.forEach(arr => this.setPlaceAsFull(arr.pos))
    }
    returnAv(id) {
        let item = this.pieces.find(e => e.id == id)
        let returnedValue = [];
        console.log(item)
        switch (item.type) {
            case 0:
                returnedValue.push(
                    [item.pos[0] - 1, item.pos[1] - 1],
                    [item.pos[0] - 1, item.pos[1] + 1],
                    [item.pos[0] - 1, item.pos[1]],
                    [item.pos[0] + 1, item.pos[1] + 1],
                    [item.pos[0] + 1, item.pos[1] - 1],
                    [item.pos[0] + 1, item.pos[1]],
                    [item.pos[0], item.pos[1] + 1],
                    [item.pos[0], item.pos[1] - 1]

                )
                break;
            case 1:
                for (let i = 0; i < 8; i++) {
                    returnedValue.push(
                        [item.pos[0], item.pos[1] - i],
                        [item.pos[0], item.pos[1] + i],
                        [item.pos[0] - i, item.pos[1]],
                        [item.pos[0] + i, item.pos[1]],
                        [item.pos[0] - i, item.pos[1] - i],
                        [item.pos[0] + i, item.pos[1] + i],
                        [item.pos[0] - i, item.pos[1] + i],
                        [item.pos[0] + i, item.pos[1] - i],
                    )
                }
                break;
             case 2:
                returnedValue.push(
                    [item.pos[0] - 2, item.pos[1] - 1],
                    [item.pos[0] - 2, item.pos[1] + 1],
                    [item.pos[0] + 2, item.pos[1] + 1],
                    [item.pos[0] + 2, item.pos[1] - 1],
                    [item.pos[0] + 1, item.pos[1] - 2],
                    [item.pos[0] - 1, item.pos[1] -2 ],
                    [item.pos[0] -1, item.pos[1] + 2],
                    [item.pos[0] +1, item.pos[1] + 2]
                )
                break;
            case 3:
                for (let i = 0; i < 8; i++) {
                    returnedValue.push(
                        [item.pos[0] - i, item.pos[1] - i],
                        [item.pos[0] + i, item.pos[1] + i],
                        [item.pos[0] - i, item.pos[1] + i],
                        [item.pos[0] + i, item.pos[1] - i],
                    )
                }
                break;
            case 4 :
                  for (let i = 0; i < 8; i++) {
                    returnedValue.push(
                    [item.pos[0], item.pos[1] - i],
                        [item.pos[0], item.pos[1] + i],
                        [item.pos[0] - i, item.pos[1]],
                        [item.pos[0] + i, item.pos[1]],
                    )
                }
                break ;
        }
        let filterdValue = returnedValue.filter(itm => 0 <= itm[0] && itm[0] <= 7 && 0 <= itm[1] && itm[1] <= 7 && !(this.board[itm[0]][itm[1]].occupied));
        console.log(returnedValue)
        filterdValue.forEach(elm => document.querySelector(`.row[id="${elm[0] + 1}"] .cell[id="${elm[1] + 1}"]`).style = "box-shadow: 0 0 25px black inset")
    }
    setPlaceAsFull(arr) {
        this.board[arr[0]][arr[1]].occupied = 1
    }
}

export default Game;


