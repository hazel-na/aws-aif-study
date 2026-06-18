import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '../public/robot-source.png');
const OUT = path.resolve(__dirname, '../public/apple-touch-icon.png');

const SIZE = 512;
const canvas = createCanvas(SIZE, SIZE);
const ctx = canvas.getContext('2d');

// 흰 배경 (로봇 원본 배경과 동일)
const r = SIZE * 0.22;
ctx.beginPath();
ctx.moveTo(r, 0);
ctx.lineTo(SIZE - r, 0);
ctx.quadraticCurveTo(SIZE, 0, SIZE, r);
ctx.lineTo(SIZE, SIZE - r);
ctx.quadraticCurveTo(SIZE, SIZE, SIZE - r, SIZE);
ctx.lineTo(r, SIZE);
ctx.quadraticCurveTo(0, SIZE, 0, SIZE - r);
ctx.lineTo(0, r);
ctx.quadraticCurveTo(0, 0, r, 0);
ctx.closePath();
ctx.fillStyle = '#FFFFFF';
ctx.fill();
ctx.clip();

// 로봇 이미지 꽉 차게
const robotBuf = fs.readFileSync(SRC);
const robot = await loadImage(robotBuf);
ctx.drawImage(robot, 0, 0, SIZE, SIZE);

const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(OUT, buffer);
console.log('Done');
