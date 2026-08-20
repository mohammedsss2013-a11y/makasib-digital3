const fs = require('fs');
const path = require('path');
const { fakerAR: faker } = require('@faker-js/faker');

const OUTPUT_DIR = path.join(__dirname, 'posts_test');

function createDummyPosts() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('جاري إنشاء 30 مقالاً...');

  for (let i = 1; i <= 30; i++) {
    const title = faker.lorem.sentence({ min: 3, max: 6 });
    
    // كود المقال مع رابط صورة مباشر
    const content = `
<h1>${title}</h1>
<p><strong>تاريخ النشر:</strong> ${new Date().toLocaleDateString('ar-EG')}</p>
<p><img src="https://picsum.photos/800/400?random=${i}" alt="${title}" style="max-width:100%; height:auto;" /></p>
<p>${faker.lorem.paragraph(3)}</p>
<h2>تفاصيل إضافية</h2>
<p>${faker.lorem.paragraph(4)}</p>
<ul>
  <li>${faker.lorem.words(3)}</li>
  <li>${faker.lorem.words(4)}</li>
  <li>${faker.lorem.words(3)}</li>
</ul>
<p>${faker.lorem.paragraph(2)}</p>
    `.trim();

    const filePath = path.join(OUTPUT_DIR, `post_${i}.html`);
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  console.log('✅ تم إنشاء 30 مقالاً بنجاح داخل مجلد posts_test!');
}

createDummyPosts();