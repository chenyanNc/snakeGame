// 定义一个蛇类
class Snake{

  // 表示蛇头的元素
  head: HTMLElement;

  // 蛇身 (HTMLCollection 是一个集合, 集合是会实时刷新的)
  bodies: HTMLCollection;

  // 获取蛇容器
  element: HTMLElement

  constructor() {
    this.element = document.getElementById('snake')!;

    // 获取 #snake div 中的第一个元素
    this.head = document.querySelector('#snake > div') as HTMLElement; // 类型断言
    this.bodies = this.element.getElementsByTagName('div');
  }

  // 获取蛇头的坐标
  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }


  // 设置蛇头坐标
  set X(value) {
    // 如果新值和旧值相同, 则直接返回不再修改
    if(this.X === value) {
      return
    }

    // console.log(value)
    // 判断 X 的值是否超出合法范围 0-290之间
    if(value < 0 || value > 290) {
      // 进入判断说明蛇撞墙了, 抛出一个异常
      throw new Error('蛇撞墙了!')

    }

    // 修改 X 时, 是在修改水平坐标, 蛇在左右移动, 蛇在向左移动时, 不能向右掉头, 反之亦然
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {

      // 如果发生了掉头, 让蛇向反方向继续移动
      if(value > this.X) {
        // 如果新值 value 大于旧值X, 则说明蛇在向左走, 此时发生掉头, 应该使蛇继续向左走

        value = this.X - 10;

      } else {

        value = this.X + 10;

      }

    }


    // 移动身体
    this.moveBody()

    this.head.style.left = value + 'px'

    // 检查有没有撞到自己
    this.checkHeadBody()
  }

  set Y(value) {
    if(this.Y === value) {
      return
    }

    // 判断 Y 的值是否超出合法范围 0-290之间
    if(value < 0 || value > 290) {
      // 进入判断说明蛇撞墙了, 抛出一个异常
      throw new Error('蛇撞墙了!')

    }


    // 修改 Y 时, 是在修改水平坐标, 蛇在上下移动, 蛇在向上移动时, 不能向下掉头, 反之亦然
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {

      // 如果发生了掉头, 让蛇向反方向继续移动
      if(value > this.Y) {
        // 如果新值 value 大于旧值Y, 则说明蛇在向上走, 此时发生掉头, 应该使蛇继续向上走

        value = this.Y - 10;

      } else {

        value = this.Y + 10;

      }
    }


    // 移动身体
    this.moveBody()

    this.head.style.top = value + 'px'

    // 检查有没有撞到自己
    this.checkHeadBody()
  }


  // 给蛇增加身体
  addBody() {
    // 向 element 中添加一个div
    var tempDiv = document.createElement('div');
    this.element.insertAdjacentElement("beforeend", tempDiv);

  }


  // 蛇身体移动的方法
  moveBody() {

    /* 
      将后边的身体设置为前边身体的位置, 从后往前改
        eg: 第 4 节 = 第 3 节的位置
            第 3 节 = 第 2 节的位置
            第 2 节 = 蛇头的位置
    */

    for(let i = this.bodies.length - 1; i > 0; i--) {
      
      // 获取前边身体的位置
      let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

      // 将值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';


    }

  }


  // 蛇不能穿过自己( 头和身体不能相撞 )
  checkHeadBody() {

    // 获取所有的身体, 检查其是否和蛇头的坐标发生重叠
    for(let i = 1; i < this.bodies.length; i++) {

      let bd = this.bodies[i] as HTMLElement

      if(this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        // 进入判断, 说明蛇头撞到身体, 游戏结束
        throw new Error('撞到自己了!')
      }

    }

  }



}


export default Snake