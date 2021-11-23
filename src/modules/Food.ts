// 定义食物类Food
class Food{

  // 定义一个属性表示食物所对应的元素
  element: HTMLElement;

  constructor() {
    // 获取页面中的 food 元素并将其赋值给 element
    // document.getElementById('food')! 表示该元素(值)一定存在
    this.element = document.getElementById('food')!;
  }

  // 定义一个获取食物 X 轴坐标的方法
  get X() {
    return this.element.offsetLeft;
  }

  // 定义一个获取食物 Y 轴坐标的方法
  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物的位置
  change() {

    // 生成随机的位置
    // 食物的位置 最小是 0 最大是 290
    // 由于蛇移动一次就是一格, 也就是 10 , 所以食物的坐标一定是 10 的倍数
    let top = Math.round(Math.random() * 29) * 10
    let left = Math.round(Math.random() * 29) * 10

    this.element.style.left = left + 'px'
    this.element.style.top = top + 'px'
  }

}

export default Food