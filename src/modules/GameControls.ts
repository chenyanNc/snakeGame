// 引入其他类
import Snake from "./Snake";
import Food from "./Food";
import ScorPanel from "./ScorePanel";


// 游戏控制器, 控制其他的所有类
class GameControl{

  // 定义三个属性
  snake: Snake;
  food: Food;
  scorePanel: ScorPanel;


  // 创建一个属性来存储蛇的移动方向(也就是按键的方向)
  direction: string = '';

  // 创建一个属性用来记录游戏是否结束
  isLive: boolean = true


  constructor() {

    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorPanel()

    this.init();

  }


  // 游戏初始化方法, 调用即游戏开始
  init() {

    // 绑定 键盘按键按下的事件
    document.addEventListener('keydown', this.keydownHandel.bind(this))
    
    // 执行 run 方法
    this.run()

  }

  /* 
    点击键盘时, event.key 获取到的按键的名称
    ArrowUp 向上  /  在 IE 中 Up
    ArrowDown 向下  /  在 IE 中 Down
    ArrowLeft 像左  /  在 IE 中 Left
    ArrowRight 向右  /  在 IE 中 Right
  
  */
  // 创建一个键盘按下的响应函数
  keydownHandel(event: KeyboardEvent) {
    // event.key 获取当前用户按下的是哪个按键
    // console.log(event.key)
    // 这里的 this 指向的是 #document ( 事件是给谁绑定的, this 指向的是就是谁 ), 所以需要在 init() 函数中改变 this 的指向 为 GameControl 这个类

    // 赋值之前需要检查 event.key 的值时候合法 ( 用户是否按了正确的按键, 也就是 是否是 按了方向键 )
    this.direction = event.key
    
  }


  // 创建一个控制蛇移动的方法
  run() {

    /* 
      根据方向 this.direction 来使蛇的位置改变
      向上  top 减少
      向下 top 增加
      向左 left 减少
      向右 left 增加
    */

    // 获取蛇现在的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;

    switch(this.direction) {
      case "ArrowUp":
      case "Up":
        // 向上移动
        Y -= 10;
        
        break;
      case "ArrowDown":
      case "Down":
        // 向下移动
        Y += 10;
        
        break;
      case "ArrowLeft":
      case "Left":
        // 向左移动
        X -= 10;
        
        break;
      case "ArrowRight":
      case "Right":
        // 向右移动
        X += 10;
        break;
    }

    // 检查蛇是否迟到了食物
    this.checkEat(X, Y)

    // 修改 蛇的 X 和 Y值
    try{

      this.snake.X = X;
      this.snake.Y = Y;

    } catch(e) {
      // 进入 catch, 说明出现了异常, 游戏终止, 弹出一个提示信息
      alert(e);

      // 将 isLive 设置为 false
      this.isLive = false


    }

    // 开启一个定时调用
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1)*30);

  }



  // 定义一个方法, 用来检查蛇是否吃到食物
  checkEat(X: number, Y: number) {

    // 如果蛇的坐标和食物的坐标相等, 则表示吃到了食物\
    if(X == this.food.X && Y === this.food.Y) {

      // 吃到食物后, 事物的位置要改变
      this.food.change();

      // 分数增加
      this.scorePanel.addScore();

      // 蛇增加一节
      this.snake.addBody();      

    }

  }


}


export default GameControl