import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {MyApp} from "../../app/app.component";

/**
 * Generated class for the Game2048Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-game2048',
  segment: 'game2048'
})
@Component({
  selector: 'page-game2048',
  templateUrl: 'game2048.html',
})
export class Game2048Page {

  cards = [[],[],[],[]];
  score: number; //分数
  maxCard: number; // 最大的数字
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    // 禁止页面下拉
    document.body.addEventListener('touchmove' , function(e){
      e.preventDefault();
    })
    this.init();
  }

  // 初始化（再来一局）
  init(){
    // 清空数据
    this.score = 0;
    this.maxCard = 0;
    this.cards = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    // 在随机位置产生2个数字
    this.getRandom(2);
  }
  // 在随机位置生成一个2
  getRandom(count?: number){
    if(MyApp.isNullOrEmpty(count)){
      count = 1;
    }
    for (let i = 0; i < count; i++) {
      let xAxis = Math.floor(Math.random()*4);
      let yAxis = Math.floor(Math.random()*4);
      let num = Math.ceil(Math.random()*4) == 4 ? 4 : 2; // 生成2和4的概率为3:1
      if(this.cards[xAxis][yAxis] == 0){
        this.cards[xAxis][yAxis] = num;
      }else{
        this.getRandom(1);
      }
    }
  }
  // 左滑事件
  swipeLeftEvent(event) {
    let removeCount = 0;
    for (let j = 0; j < this.cards.length; j++) {
      for (let k = 0; k < this.cards[j].length-1; k++) {
        // 左边的数和右边相邻的数进行比较，相同则叠加
        for (let i = 0; i < this.cards[j].length-1; i++) {
          if((this.cards[j][i] == this.cards[j][i+1]) || (this.cards[j][i] == 0 ) || (this.cards[j][i+1] == 0)){
            this.cards[j][i] += this.cards[j][i+1];
            if(this.maxCard < this.cards[j][i]){
              this.maxCard = this.cards[j][i];
              if(this.maxCard == 2048){
                this.showAlert();
              }
            }
            this.score += this.cards[j][i+1];//计分
            this.cards[j][i+1] = 0;
            removeCount++;
          }
        }
      }
    }
    // 有移动，则产生一个随机数
    if(removeCount>0){
      this.getRandom(1);
    }
    // 检测游戏是否结束
    if(this.gameIsOver() == true){
      this.showConfirm();
    }
  }
  // 右滑事件
  swipeRightEvent(event) {
    let removeCount = 0;
    for (let j = 0; j < this.cards.length; j++) {
      for (let k = 0; k < this.cards[j].length-1; k++) {
        // 左边的数和右边相邻的数进行比较，相同则叠加
        for (let i = this.cards[j].length-1; i > 0 ; i--) {
          if((this.cards[j][i] == this.cards[j][i-1]) || (this.cards[j][i] == 0 ) || (this.cards[j][i-1] == 0)){
            this.cards[j][i] += this.cards[j][i-1];
            if(this.maxCard < this.cards[j][i]){
              this.maxCard = this.cards[j][i];
              if(this.maxCard == 2048){
                this.showAlert();
              }
            }
            this.score += this.cards[j][i-1];//计分
            this.cards[j][i-1] = 0;
            removeCount++;
          }
        }
      }
    }
    // 有移动，则产生一个随机数
    if(removeCount>0){
      this.getRandom(1);
    }
    // 检测游戏是否结束
    if(this.gameIsOver() == true){
      this.showConfirm();
    }
  }
  // 上滑事件
  swipeUpEvent(event) {
    let removeCount = 0;
    for (let i = 0; i < this.cards[0].length; i++) {
      for (let k = 0; k < this.cards.length-1; k++) {
        // 左边的数和右边相邻的数进行比较，相同则叠加
        for (let j = 0; j < this.cards.length-1; j++) {
          if((this.cards[j][i] == this.cards[j+1][i]) || (this.cards[j][i] == 0 ) || (this.cards[j+1][i] == 0)){
            this.cards[j][i] += this.cards[j+1][i];
            if(this.maxCard < this.cards[j][i]){
              this.maxCard = this.cards[j][i];
              if(this.maxCard == 2048){
                this.showAlert();
              }
            }
            this.score += this.cards[j+1][i];//计分
            this.cards[j+1][i] = 0;
            removeCount++;
          }
        }
      }
    }
    // 有移动，则产生一个随机数
    if(removeCount>0){
      this.getRandom(1);
    }
    // 检测游戏是否结束
    if(this.gameIsOver() == true){
      this.showConfirm();
    }
  }
  // 下滑事件
  swipeDownEvent(event) {
    let removeCount = 0;
    for (let i = 0; i < this.cards[0].length; i++) {
      for (let k = 0; k < this.cards.length-1; k++) {
        // 左边的数和右边相邻的数进行比较，相同则叠加
        for (let j = this.cards.length-1; j > 0; j--) {
          if((this.cards[j][i] == this.cards[j-1][i]) || (this.cards[j][i] == 0 ) || (this.cards[j-1][i] == 0)){
            this.cards[j][i] += this.cards[j-1][i];
            if(this.maxCard < this.cards[j][i]){
              this.maxCard = this.cards[j][i];
              if(this.maxCard == 2048){
                this.showAlert();
              }
            }
            this.score += this.cards[j-1][i];//计分
            this.cards[j-1][i] = 0;
            removeCount++;
          }
        }
      }
    }
    // 有移动，则产生一个随机数
    if(removeCount>0){
      this.getRandom(1);
    }
    // 检测游戏是否结束
    if(this.gameIsOver() == true){
      this.showConfirm();
    }
  }
  // 检测游戏是否结束
  gameIsOver(){
    // 遍历全部数据
    for (let i = 0; i < this.cards.length; i++) {
      for (let j = 0; j < this.cards[i].length; j++) {
        // 判断是否为0
        if(this.cards[i][j] == 0){
          return false;
        }
        // 判断横向相邻数字是否相同
        if(j<this.cards[i].length-1){
          if(this.cards[i][j] == this.cards[i][j+1]){
            return false;
          }
        }
        // 判断纵向相邻数字是否相同
        if(i<this.cards.length-1){
          if(this.cards[i][j] == this.cards[i+1][j]){
            return false;
          }
        }
      }
    }
    return true;
  }
  // 显示确认框
  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: '喔，无路可走了！',
      message: ' 再来一局 ？',
      buttons: [
        {
          text: '好的',
          handler: () => {
            this.init();
          }
        },
        {
          text: '不玩了',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }
  // 显示弹框
  showAlert() {
    const alert = this.alertCtrl.create({
      title: '通关啦！',
      subTitle: '<br>2048 是个神奇的数字，它等于【我们在一起的日子】+【生生世世】<br><br>2048 = (2015 + 04 + 15) + (3 + 3 + 4 + 4)<br><br>爱你么么哒！ ',
      buttons: ['我也爱你！']
    });
    alert.present();
  }
}
