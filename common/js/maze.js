"use strict";

// 迷路生成（穴掘り法）
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");
let maze = [];
let startCells = [];
let maze_print = [];
let y, x;
var timer_id=null;

const WIDTH = 39, HEIGHT = 39;
const COLOR_BLUE = 'rgb(39, 115, 168)';
const COLOR_WHITE = 'rgb(254, 249, 255)';
const COLOR_PINK = 'rgb(255, 0, 0)';
const SPEED = 5;
const SHOW_PRINT = true;

// キャンバスサイズ
canvas.width = canvas.height = 350;

//----------------------------
// 迷路の2次元配列作成 壁で埋める(壁は1、通路は0)
for( y = 0; y < HEIGHT; y++){
    maze[y] = [];
    for( x = 0; x < WIDTH; x++){
        if(y==0 || x==0 || y==HEIGHT-1 || x==WIDTH-1){
            maze[y][x] = 0; // 外壁は判定の為通路にしておく(最後に戻す)
        } else {
            maze[y][x] = 1;
        }
    }
}

//----------------------------
// 描画
// カンバスの大きさに合わせてサイズを拡大
ctx.scale(canvas.width / WIDTH-1, canvas.width / WIDTH-1);
ctx.fillStyle = COLOR_BLUE; // blue
for( y = 0; y < HEIGHT; y++){
    for( x = 0; x < WIDTH; x++){
        if(maze[y][x] == 1){
            ctx.fillStyle = COLOR_BLUE;
        } else {
            ctx.fillStyle = COLOR_WHITE
        }
        ctx.fillRect(x, y, 1, 1);
    }
}

//----------------------------
// 穴掘り開始
dig(1, 1);

//----------------------------
// 外壁を戻す
if(SHOW_PRINT){
    ctx.fillStyle = COLOR_BLUE;
    for(y=0; y<HEIGHT; y++){
        for(x=0; x<WIDTH; x++){
            if(y==0 || x==0 || y==HEIGHT-1 || x==WIDTH-1){
                maze_print.push([y, x]);
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }
}
//-----------------------------------------------------------------------

//----------------------------
// 乱数を取得する
function rand(min, max){
    return Math.floor(Math.random()*(max+1-min)+min);
}

//----------------------------
// 座標(x, y)に穴を掘る
function dig(y, x){
    // 指定座標から掘れなくなるまで堀り続ける
    while(true){
        // 掘り進めることができる方向のリストを作成
        var directions = [];
        if(maze[y-1] && maze[y-2] && maze[y-1][x]==1 && maze[y-2][x]==1){ // up
            directions.push('up');
        }
        if(maze[y] && maze[y][x+1] && maze[y][x+2] && maze[y][x+1]==1 && maze[y][x+2]==1){ // right
            directions.push('right');
        }
        if(maze[y+1] && maze[y+2] && maze[y+1][x]==1 && maze[y+2][x]==1){ // down
            directions.push('down');
        }
        if(maze[y] && maze[y][x-1] && maze[y][x-2] && maze[y][x-1]==1 && maze[y][x-2]==1){ // left
            directions.push('left');
        }
        // 掘り進められない場合、ループを抜ける
        if(directions.length==0) {
            break;
        }

        // 指定座標を通路とし穴掘り候補座標から削除
        setPath(y, x);

        // 候補リストの中から、ランダムで方向を選ぶ。
        var d = rand(0, directions.length-1);

        switch(directions[d]){
            case 'up':
                setPath(--y, x);
                setPath(--y, x);
                break;
            case 'right':
                setPath(y, ++x);
                setPath(y, ++x);
                break;
            case 'down':
                setPath(++y, x);
                setPath(++y, x);
                break;
            case 'left':
                setPath(y, --x);
                setPath(y, --x);
                break;
        }

        // どこにも掘り進められない場合、穴掘り開始候補座標から掘りなおし
        // 候補座標が存在しないとき、穴掘り完了
        var cell = getStartCell();
        if (cell != null) {
            //console.log('cell', cell[0], cell[1]);
            dig(cell[0], cell[1]);
        }
    }
}
//----------------------------
// 座標を通路とする(穴掘り開始座標候補の場合は保持)
function setPath(y, x) {
    if(maze[y] && maze[y][x]){
        maze[y][x] = 0;
        if(!SHOW_PRINT){
            ctx.fillStyle=COLOR_WHITE;
            ctx.fillRect(x, y, 1, 1);
        } else {
            // プリント用の配列に入れておく
            maze_print.push([y, x]);
        }
    }
    // 奇数だったら穴掘り候補
    if(y%2==1 && x%2==1){
        startCells.push(new Array(y, x));
    }
}
//----------------------------
// 穴掘り開始位置をランダムに取得する
function getStartCell(){
    if(startCells.length==0) return null;   // 候補がなかったら抜ける
    var index = rand(0, startCells.length-1);
    var cell = startCells[index];
    //console.log('getStartCell', startCells.length, cell);
    startCells.splice(index);   // 除去

    return cell;
}

//console.log(maze);
//----------------------------
// 印字をステップで見せる場合
//console.log(maze_print.length);
var i=0;
function printMaze(){
    y = maze_print[i][0];
    x = maze_print[i][1];
    if(y==0 || x==0 || y==HEIGHT-1 || x==WIDTH-1) {
        // 外壁
    } else {
        ctx.fillRect(x, y, 1, 1);
    }
    i++;
    if(i>=maze_print.length){
        console.log('clearindex', i);
        clearInterval(timer_id);
        //----------------------------
        // スタートとゴールを作る
        var min_y=0, min_x=0, max_y=0, max_x=0;
        for(y=1; y<HEIGHT-1; y++){
            for(x=1; x<WIDTH-1; x++){
                // ゴール
                if(maze[y][x]==1){
                    if(min_y==0) min_y = y;
                    if(min_x==0) min_x = x-1;
                }
                // スタート
                if(maze[y][x]==1){
                    if(max_y<=y)  max_y = y;
                    if(max_x<=x) max_x = x;
                }
            }
        }
        ctx.fillStyle = COLOR_PINK;
        ctx.fillRect(min_x, min_y, 1, 1);
        ctx.fillRect(max_x, max_y, 1, 1);
    }
}
if(SHOW_PRINT){
    ctx.fillStyle = COLOR_WHITE;
    timer_id = setInterval(printMaze, SPEED);
}