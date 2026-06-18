import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCX_PATH = path.resolve(__dirname, 'source.docx');

const result = await mammoth.extractRawText({ path: DOCX_PATH });
const rawText = result.value.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

// Q142 블록의 끝 부분 + Q145 시작 부분 확인
const q142Idx = rawText.indexOf('\nQuestion 142\n');
const q145Idx = rawText.indexOf('\nQuestion 145\n');
const segment = rawText.substring(q142Idx, q145Idx + 50);
console.log('=== Q142~Q145 사이 텍스트 (JSON) ===');
console.log(JSON.stringify(segment));

// Q114 블록 (정답 UNKNOWN 케이스) 확인
const q114Idx = rawText.indexOf('\nQuestion 114\n');
const q115Idx = rawText.indexOf('\nQuestion 115\n');
const q114seg = rawText.substring(q114Idx, q115Idx);
console.log('\n=== Q114 RAW (정답 확인) ===');
console.log(JSON.stringify(q114seg));
