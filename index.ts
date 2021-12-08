import { fromEvent, interval, merge, timer } from 'rxjs';
import { concatAll, concatMap, map, mapTo } from 'rxjs/operators';
import './style.css';

function createHome() {
  return timer(2000).pipe(mapTo('home completed!'));
}

function createHall() {
  return timer(5000).pipe(mapTo('hall completed!'));
}

const homeEl = document.getElementById('homeId');
const hallEl = document.getElementById('hallId');
// observable เมื่อ click
const clickHome$ = fromEvent(homeEl, 'click').pipe(map(() => createHome()));
const clickHall$ = fromEvent(hallEl, 'click').pipe(map(() => createHall()));

merge(clickHome$, clickHall$)
  .pipe(concatMap((res) => res))
  .subscribe((res) => console.log(res));

// โจทย์
// มี Observable เมื่อคลิกปุ่ม build home, build hall
// เมื่อคลิก build home ให้ทำการทำ observable createHome()
// เมื่อคลิก build hall ให้ทำการทำ observable createHall()
// เงื่อนไขคือ ทุกๆการคลิก คือการสร้าง home  และ hall
// จะสามารถสร้างได้ทีละ Observable ห้ามทำซ้อนกัน
// ถ้ามีการกด build home แล้วกด build hall
// จะต้องรอสร้าง home เสร็จก่อน จากนั้นให้สร้าง hall ต่ออันโนมัติ
