// 定义表示 ScorePanel (计分盘)的类
class ScorPanel{

  // score 和 level 用来记录分数和等级
  scroe: number = 0;
  level: number = 1;

  // 分数和等级所在的元素吗再构造函数中进行初始化
  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  // 这只一个变量限制等级
  maxLevel: number;

  // 设置多少分时升级
  upScore: number;


  constructor(maxLevel: number = 10, upScore: number = 2) {

    this.scoreEle = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;

    this.maxLevel = maxLevel
    this.upScore = upScore
  }


  // 设置一个加分的方法
  addScore() {
    // 使分数自增, 并赋值到页面
    this.scroe++
    this.scoreEle.innerHTML = this.scroe + '';

    // 判断分数每次为 整 10 分的时候升一级 (每10分升一级)
    if(this.scroe % this.upScore === 0) {
      this.levelUp()
    }

  }

  // 等级提升的方法
  levelUp() {
    // 设置等级上限
    if(this.level < this.maxLevel) {
      this.level++
      this.levelEle.innerHTML = this.level + '';
    }
  }

}

export default ScorPanel