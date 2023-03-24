import { randomUUID } from 'crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

async function createJSON() {
  const dir = path.resolve(process.cwd(), 'db', 'data.json');
  const readfile = JSON.parse(await fs.readFile(dir, 'utf-8'));
  readfile.questions = readfile.questions.map((question: any) => {
    question.id = randomUUID();
    if (question.userinput.type === 'datalist') {
      question.userinput.inputConfig.options =
        question.userinput.inputConfig.options.map((option: any) => {
          return {
            id: randomUUID(),
            option: option.name,
          };
        });
    }
    return question;
  });
  await fs.writeFile(dir, JSON.stringify(readfile), 'utf-8');
}

createJSON();
