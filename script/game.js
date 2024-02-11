let piecesData = [
    { id: "wk", code: 0, img: "wk.png", isWhite: 1, dpos: [3, 4], count: 1 },
    { id: "wq", code: 1, img: "wq.png", isWhite: 1, dpos: [4, 4], count: 1 },
    { id: "wkn", code: 2, img: "wkn.png", isWhite: 1, dpos: [[5, 5], [6, 7]], count: 2 },
    { id: "wb", code: 3, img: "wb.png", isWhite: 1, dpos: [[2, 7], [5, 7]], count: 2 },
    { id: "wr", code: 4, img: "wr.png", isWhite: 1, dpos: [[0, 7], [7, 7]], count: 2 },
    { id: "wp", code: 5, img: "wp.png", isWhite: 1, dpos: 6, count: 8 },
    { id: "bk", code: 0, img: "bk.png", isWhite: 0, dpos: [4, 0], count: 1 },
    { id: "bq", code: 1, img: "bq.png", isWhite: 0, dpos: [4, 3], count: 1 },
    { id: "bkn", code: 2, img: "bkn.png", isWhite: 0, dpos: [[1, 0], [6, 0]], count: 2 },
    { id: "bb", code: 3, img: "bb.png", isWhite: 0, dpos: [[2, 0], [5, 0]], count: 2 },
    { id: "br", code: 4, img: "br.png", isWhite: 0, dpos: [[0, 0], [7, 0]], count: 2 },
    { id: "bp", code: 5, img: "bp.png", isWhite: 0, dpos: 1, count: 8 },
];

class Game {
    constructor() {
        this.isWhiteTurn = 1;
        this.playable = null;
        this.check = false;
        this.pieces = piecesData.flatMap((element) => {
            let elementToReturn = [];
            if (element.count == 1) {
                elementToReturn.push({
                    pos: element.dpos,
                    isWhite: element.isWhite,
                    img: element.img,
                    firstMove: 0,
                    type: element.code,
                    id: `${element.id}1`
                })
            } else if (element.count == 2) {
                elementToReturn.push({
                    firstMove: 0,
                    pos: element.dpos[0],
                    isWhite: element.isWhite,
                    img: element.img,
                    type: element.code,
                    id: `${element.id}1`
                    , firstMove: 0
                }, {
                    pos: element.dpos[1],
                    isWhite: element.isWhite,
                    type: element.code,
                    img: element.img,
                    id: `${element.id}2`
                    , firstMove: 0
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
                            id: `${element.id}${i}`,
                            firstMove: 0
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
                        occupied: false,
                        piece: null,
                    });
                }
                return arrayToReturn;
            }
        );
        document
            .querySelectorAll(".cell")
            .forEach(
                (e) =>
                    ((e.id % 2 != 0 && e.parentElement.id % 2 == 0) ||
                        (e.id % 2 == 0 && e.parentElement.id % 2 != 0)) &&
                        e.classList.add("blackCell")
                        );
                        this.initializeBoard();
                    }
                    initializeBoard() {
                        document.querySelectorAll(".cell").forEach(elm => { elm.addEventListener("dragover", (e) => { e.preventDefault() }) })
                        document.querySelectorAll(".cell").forEach(elmt => elmt.addEventListener("drop", (event) => { this.piecePlay(event) }))
                        this.update()
                    }
                    
                    update() {
                        this.playable = null
                        document.querySelectorAll(".cell").forEach((elm) => elm.innerHTML = "")
                        this.pieces.forEach((elm) => {
                            if (elm) {
                                document.querySelector(`.row[id='${elm.pos[0] + 1}'] .cell[id='${elm.pos[1] + 1}']`).innerHTML = ` <img class="piece" id="${elm.id}" draggable="true" src="./images/${elm.img}"/>`
                            }
                        })
                        document.querySelectorAll(".piece").forEach(elm => elm.addEventListener("dragend", () => document.querySelectorAll(".cell").forEach(elm => { elm.style = ""; elm.classList.remove("playable") })))
                        document.querySelectorAll(".piece").forEach(elm => elm.addEventListener("dragstart", (e) => {
                            if (this.pieces.find(elmnt => elmnt && elmnt.id == elm.id && elmnt.isWhite === this.isWhiteTurn)) {
                                this.playable = this.returnAv(elm.id, "av");
                                e.dataTransfer.clearData();
            e.dataTransfer.setData("text/plain", elm.id)
        }
    }))
    this.pieces.forEach(arr => arr && this.setPlaceAsFull(arr.pos, { isWhite: arr.isWhite, id: arr.id }))
    if (this.isWhiteTurn) {
        document.querySelector(".board").classList.remove("blackTurn")
    } else {
        document.querySelector(".board").classList.add("blackTurn")
    }
    if (this.checkKingMoves(this.isWhiteTurn)) {
        this.check = true
    }
}

returnAv(id, returnType, pieces = this.pieces, board = this.board) {
    let item = pieces.find(e => e && e.id == id)
    let returnedValue = [];
    let leftTopSideFull = false;
    let leftBottomSideFull = false;
    let topFull = false;
    let bottomFull = false;
    let rightTopSideFull = false;
    let rightBottomSideFull = false;
    let rightFull = false;
    let leftFull = false;
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
            let castleLeft = true;
            let castleRight = true;
            let rightRook = pieces.find(elm => elm && elm.id == `${item.isWhite ? "w" : "b"}r2`);
            let leftRook = pieces.find(elm => elm && elm.id == `${item.isWhite ? "w" : "b"}r1`);
            for (let i = 1; i < 7; i++) {
                if ((board[i][item.pos[1]].occupied && i < item.pos[0]) || (leftRook.firstMove) || item.firstMove) {
                    castleLeft = false
                }
                if ((board[i][item.pos[1]].occupied && i > item.pos[0]) || (rightRook.firstMove) || item.firstMove) {
                    castleRight = false
                }
            }
            if (castleRight) {
                returnedValue.push([item.pos[0] + 2, item.pos[1]])
            }
            if (castleLeft) {
                returnedValue.push([item.pos[0] - 2, item.pos[1]])
            }
            break;
            case 1:
                for (let i = 1; i < 8; i++) {
                    if (!leftTopSideFull) {
                        returnedValue.push(
                            [item.pos[0] - i, item.pos[1] - i],
                            )
                            try {
                                if (board[item.pos[0] - i][item.pos[1] - i].occupied) {
                                    throw ("empty")
                                }
                            } catch {
                                leftTopSideFull = true
                            }
                        }
                        if (!leftBottomSideFull) {
                            returnedValue.push(
                                [item.pos[0] - i, item.pos[1] + i],
                                )
                                try {
                                    if (board[item.pos[0] - i][item.pos[1] + i].occupied) {
                                        throw ("empty")
                                    }
                                } catch {
                        leftBottomSideFull = true
                    }
                }
                if (!topFull) {
                    returnedValue.push(
                        [item.pos[0], item.pos[1] - i],
                        )
                        try {
                            if (board[item.pos[0]][item.pos[1] - i].occupied) {
                                throw ("empty")
                            }
                        } catch {
                            topFull = true
                        }
                    }
                    
                    if (!bottomFull) {
                        returnedValue.push(
                            [item.pos[0], item.pos[1] + i],
                            )
                            try {
                                if (board[item.pos[0]][item.pos[1] + i].occupied) {
                                    throw ("empty")
                                }
                    } catch {
                        bottomFull = true
                    }
                }
                
                if (!rightBottomSideFull) {
                    returnedValue.push(
                        [item.pos[0] + i, item.pos[1] + i],
                        )
                        try {
                            if (board[item.pos[0] + i][item.pos[1] + i].occupied) {
                                throw ("empty")
                            }
                        } catch {
                            rightBottomSideFull = true
                        }
                    }
                    if (!rightTopSideFull) {
                        returnedValue.push(
                            [item.pos[0] + i, item.pos[1] - i],
                            )
                            try {
                                if (board[item.pos[0] + i][item.pos[1] - i].occupied) {
                            throw ("empty")
                        }
                    } catch {
                        rightTopSideFull = true
                    }
                } if (!leftFull) {
                    returnedValue.push(
                        [item.pos[0] - i, item.pos[1]],
                        )
                        try {
                            if (board[item.pos[0] - i][item.pos[1]].occupied) {
                            throw ("empty")
                        }
                    } catch {
                        leftFull = true
                    }
                } if (!rightFull) {
                    returnedValue.push(
                        [item.pos[0] + i, item.pos[1]],
                        )
                        try {
                            if (board[item.pos[0] + i][item.pos[1]].occupied) {
                                throw ("empty")
                        }
                    } catch {
                        rightFull = true
                    }
                }
            }
            break;
            case 2:
                returnedValue.push(
                    [item.pos[0] - 2, item.pos[1] - 1],
                    [item.pos[0] - 2, item.pos[1] + 1],
                    [item.pos[0] + 2, item.pos[1] + 1],
                    [item.pos[0] + 2, item.pos[1] - 1],
                    [item.pos[0] + 1, item.pos[1] - 2],
                    [item.pos[0] - 1, item.pos[1] - 2],
                    [item.pos[0] - 1, item.pos[1] + 2],
                    [item.pos[0] + 1, item.pos[1] + 2]
                    )
                    break;
                    case 3:
                        for (let i = 1; i < 8; i++) {
                            if (!leftTopSideFull) {
                                returnedValue.push(
                                    [item.pos[0] - i, item.pos[1] - i],
                                    )
                                    try {
                                        if (board[item.pos[0] - i][item.pos[1] - i].occupied) {
                                            throw ("empty")
                                        }
                                    } catch {
                                        leftTopSideFull = true
                                    }
                                }
                                if (!leftBottomSideFull) {
                                    returnedValue.push(
                        [item.pos[0] - i, item.pos[1] + i],
                    )
                    try {
                        if (board[item.pos[0] - i][item.pos[1] + i].occupied) {
                            throw ("empty")
                        }
                    } catch {
                        leftBottomSideFull = true
                    }
                }
                if (!rightBottomSideFull) {
                    returnedValue.push(
                        [item.pos[0] + i, item.pos[1] + i],
                    )
                    try {
                        if (board[item.pos[0] + i][item.pos[1] + i].occupied) {
                            throw ("empty")
                        }
                    } catch {
                        rightBottomSideFull = true
                    }
                }
                if (!rightTopSideFull) {
                    returnedValue.push(
                        [item.pos[0] + i, item.pos[1] - i],
                        )
                        try {
                            if (board[item.pos[0] + i][item.pos[1] - i].occupied) {
                                throw ("empty")
                            }
                        } catch {
                            rightTopSideFull = true
                        }
                    }
                }
                break;
                case 4:
                    for (let i = 1; i < 8; i++) {
                        if (!topFull) {
                            returnedValue.push(
                                [item.pos[0], item.pos[1] - i],
                                )
                                try {
                                    if (board[item.pos[0]][item.pos[1] - i].occupied) {
                                        throw ("empty")
                                    }
                                } catch {
                                    topFull = true
                                }
                }
                if (!bottomFull) {
                    returnedValue.push(
                        [item.pos[0], item.pos[1] + i],
                        )
                        try {
                            if (board[item.pos[0]][item.pos[1] + i].occupied) {
                                throw ("empty")
                            }
                        } catch {
                            bottomFull = true
                        }
                    }
                if (!leftFull) {
                    returnedValue.push(
                        [item.pos[0] - i, item.pos[1]],
                        )
                        try {
                            if (board[item.pos[0] - i][item.pos[1]].occupied) {
                                throw ("empty")
                            }
                        } catch {
                            leftFull = true
                        }
                    } if (!rightFull) {
                        returnedValue.push(
                            [item.pos[0] + i, item.pos[1]],
                            )
                            try {
                                if (board[item.pos[0] + i][item.pos[1]].occupied) {
                                    throw ("empty")
                                }
                            } catch {
                                rightFull = true
                            }
                }
            }
            break;
            case 5:
                if (returnType == "av") {
                    if (!board[item.pos[0]][item.isWhite ? item.pos[1] - 1 : item.pos[1] + 1].occupied) {
                        returnedValue.push(
                            [item.pos[0], item.isWhite ? item.pos[1] - 1 : item.pos[1] + 1]
                            )
                        }
                        if (!item.firstMove && !board[item.pos[0]][item.isWhite ? item.pos[1] - 1 : item.pos[1] + 1].occupied && !board[item.pos[0]][item.isWhite ? item.pos[1] - 2 : item.pos[1] + 2].occupied) {
                            returnedValue.push(
                        [item.pos[0], item.isWhite ? item.pos[1] - 2 : item.pos[1] + 2]
                    )
                }
                if (item.isWhite == 1) {
                    
                    returnedValue.push
                    ((item.pos[0] <= 6 && board[item.pos[0] + 1][item.pos[1] - 1].occupied && [item.pos[0] + 1, item.pos[1] - 1]),
                    (item.pos[0] >= 1 && board[item.pos[0] - 1][item.pos[1] - 1].occupied && [item.pos[0] - 1, item.pos[1] - 1]))
                } else {
                    returnedValue.push
                    ((item.pos[0] <= 6 && board[item.pos[0] + 1][item.pos[1] + 1].occupied && [item.pos[0] + 1, item.pos[1] + 1]),
                    (item.pos[0] >= 1 && board[item.pos[0] - 1][item.pos[1] + 1].occupied && [item.pos[0] - 1, item.pos[1] + 1]))
                }
            } else {
                if (item.isWhite == 1) {
                    returnedValue.push
                    ((item.pos[0] <= 6 && [item.pos[0] + 1, item.pos[1] - 1]),
                    (item.pos[0] >= 1 && [item.pos[0] - 1, item.pos[1] - 1]))
                } else {
                    returnedValue.push
                    ((item.pos[0] <= 6 && [item.pos[0] + 1, item.pos[1] + 1]),
                    (item.pos[0] >= 1 && [item.pos[0] - 1, item.pos[1] + 1]))
                }
            }
            break;
        }
        
        
        
        let filterdValue = returnedValue.filter(itm => 0 <= itm[0] && itm[0] <= 7 && 0 <= itm[1] && itm[1] <= 7 && !(board[itm[0]][itm[1]].occupied && board[itm[0]][itm[1]].piece.isWhite == item.isWhite));
        if (returnType == "av") {
            if (item.type == 0 ) {
                filterdValue = filterdValue.filter((elm) => {
                    const sentPieces = this.cloneArray(pieces);
                    const sentBoard = this.cloneArray(board);
                const pieceInd = sentPieces.findIndex(elmt => elmt && elmt.id == item.id);
                
                sentBoard[elm[0]][elm[1]].occupied = true;
                sentBoard[elm[0]][elm[1]].piece = { isWhite: item.isWhite, id: item.id }
                sentBoard[item.pos[0]][item.pos[1]].occupied = false;
                sentBoard[item.pos[0]][item.pos[1]].piece = null
                
                sentPieces[pieceInd].pos = elm
                
                return (this.checkKingMoves(item.isWhite, sentPieces, sentBoard)).length == 0
            })
        }
        if (this.check) {
            filterdValue = filterdValue.filter(elm => {
                const parBoard = this.cloneArray(board);
                const parPieces = this.cloneArray(pieces)
                const pieceInd = parPieces.findIndex(elmt => elmt && elmt.id == item.id);
                const eatenPiece = parPieces.findIndex(elmt=>elmt  && elmt.pos[0] == elm[0] && elmt.pos[1] == elm[1] && elmt.isWhite != this.isWhiteTurn) 
                if(eatenPiece != -1 ) parPieces[eatenPiece] = null
                
                parBoard[elm[0]][elm[1]].occupied = true;
                parBoard[elm[0]][elm[1]].piece = { isWhite: item.isWhite, id: item.id }
                parBoard[item.pos[0]][item.pos[1]].occupied = false;
                parBoard[item.pos[0]][item.pos[1]].piece = null;
                parPieces[pieceInd].pos = elm
                    if (this.checkKingMoves(item.isWhite, parPieces, parBoard).length == 0) {
                        return true
                    } else {
                        return false
                    }
                })
            }
            let namnamValues = filterdValue.filter(itm => board[itm[0]][itm[1]].occupied);
            filterdValue.forEach(elm => !namnamValues.find(felm => elm[0] == felm[0] && elm[1] == felm[1]) && document.querySelector(`.row[id="${elm[0] + 1}"] .cell[id="${elm[1] + 1}"]`).classList.add("playable"))
            namnamValues.forEach(elm => document.querySelector(`.row[id="${elm[0] + 1}"] .cell[id="${elm[1] + 1}"]`).style = "background-color:red")
            return filterdValue
        } else {
            let namnamValues = filterdValue.filter(itm => board[itm[0]][itm[1]].occupied);
            return namnamValues;
        }
    }
    setPlaceAsFull(arr, piece) {
        this.board[arr[0]][arr[1]].occupied = true
        this.board[arr[0]][arr[1]].piece = piece
    }
    piecePlay(event) {
        const target = event.target.classList[0] == "piece" ? event.target.parentElement : event.target;
        const pos = [target.parentElement.id - 1, target.id - 1]
        const pieceInd = this.pieces.findIndex(elm => elm && elm.id == event.dataTransfer.getData("text"))
        const piece = this.pieces[pieceInd]
        if (this.playable && this.playable.find((elm) => elm && elm[1] == pos[1] && elm[0] == pos[0])) {
            if (piece.type == 0 && pos[1] == piece.pos[1] && -2 == piece.pos[0] - pos[0] || piece.pos[0] - pos[0] == 2) {
                if (piece.pos[0] - pos[0] == -2) {
                    let rook = this.pieces.find(elm => elm && elm.id == `${piece.isWhite ? "w" : "b"}r2`)
                    this.movePiece(rook, [rook.pos[0] - 2, rook.pos[1]])
                } else {
                    let rook = this.pieces.find(elm => elm && elm.id == `${piece.isWhite ? "w" : "b"}r1`)
                    this.movePiece(rook, [rook.pos[0] + 3, rook.pos[1]])
                }
                this.movePiece(piece, pos)
            } else {
                if (this.board[pos[0]][pos[1]].occupied) {
                    const eatenPiece = this.pieces.findIndex(elm => elm && elm.pos[0] == pos[0] && elm.pos[1] == pos[1])
                    this.pieces[eatenPiece] = null
                }
                this.movePiece(piece, pos)
            }
            this.pieces[pieceInd].firstMove = true
            this.isWhiteTurn = this.isWhiteTurn ? 0 : 1
        }
        this.update()
    }
    movePiece(piece, pos) {
        const piecePos = piece.pos;
        piece.pos = pos;
        this.board[piecePos[0]][piecePos[1]] = {
            occupied: false,
            piece: null
        }
    }
    checkKingMoves(isWhite, pieces = this.pieces, board = this.board) {
        const enPieces = pieces.filter(elm => elm && elm.isWhite != isWhite);
        const newPieces = this.cloneArray(pieces);
        const king = newPieces.find(elm => elm && elm.type == 0 && elm.isWhite == isWhite)
        let originalPos = king.pos
        let newBoard = this.cloneArray(board)
        let finalResults = [];
        let kingPos = king.pos;
        newPieces[newPieces.findIndex(elm => elm && elm.type == 0 && elm.isWhite == isWhite)].pos = kingPos;

        newBoard[originalPos[0]][originalPos[1]].occupied = false
        newBoard[originalPos[0]][originalPos[1]].piece = null
        newBoard[kingPos[0]][kingPos[1]].occupied = true
        newBoard[kingPos[0]][kingPos[1]].piece = [king.id, king.isWhite]

        for (let i of enPieces) {
            let avPoses = this.returnAv(i.id, "nam", newPieces, newBoard)
            finalResults.push(avPoses.filter(posElm => posElm[0] == kingPos[0] && posElm[1] == kingPos[1]))
        }

        return finalResults.filter(elment => elment.length > 0)
    }
    cloneArray(arr) {
        const fakeArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                fakeArr[i] = this.cloneArray(arr[i]);
            } else {
                fakeArr[i] =arr[i] ?{ ...arr[i] }:arr[i]
            }
        }
        return fakeArr
    }
}

export default Game;