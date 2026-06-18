import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../public/apple-touch-icon.png');

const SIZE = 512;
const canvas = createCanvas(SIZE, SIZE);
const ctx = canvas.getContext('2d');

// 둥근 모서리 배경 (sky blue gradient)
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

const grad = ctx.createLinearGradient(0, 0, SIZE, SIZE);
grad.addColorStop(0, '#0EA5E9');
grad.addColorStop(1, '#0369A1');
ctx.fillStyle = grad;
ctx.fill();

// AWS 텍스트
ctx.fillStyle = 'rgba(255,255,255,0.75)';
ctx.font = 'bold 60px Arial';
ctx.textAlign = 'center';
ctx.fillText('AWS', SIZE / 2, 160);

// AIF 메인 텍스트
ctx.fillStyle = 'white';
ctx.font = 'bold 200px Arial';
ctx.textAlign = 'center';
ctx.fillText('AIF', SIZE / 2, 340);

// 합격앱 서브 텍스트
ctx.fillStyle = 'rgba(255,255,255,0.85)';
ctx.font = 'bold 70px Arial';
ctx.textAlign = 'center';
ctx.fillText('합격앱', SIZE / 2, 430);

// 초록 체크 뱃지
const bx = SIZE - 115, by = 90, br = 65;
ctx.beginPath();
ctx.arc(bx, by, br, 0, Math.PI * 2);
ctx.fillStyle = '#22C55E';
ctx.fill();

ctx.strokeStyle = 'white';
ctx.lineWidth = 12;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.beginPath();
ctx.moveTo(bx - 28, by);
ctx.lineTo(bx - 8, by + 22);
ctx.lineTo(bx + 28, by - 22);
ctx.stroke();

const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(OUT, buffer);
console.log('✅ apple-touch-icon.png 생성:', OUT);
