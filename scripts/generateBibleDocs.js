const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const API_URL = "http://localhost:1337/api";
const DOCS_PATH = "./docs";
const SIDEBAR_PATH = "./sidebars.js";

// 将 verse.text 转为 <Word /> 字符串
function renderVerseText (v) {
  if (!v.text) return "";

  return v.text
    .map((p) =>
      p.children
        .map((c) =>
          c.text
            .split(/\s+/)
            .map((w) => (w ? `<Word word="${w}" />` : " "))
            .join(" ")
        )
        .join("")
    )
    .join("\n\n");
}

async function fetchBooks () {
  const { data } = await axios.get(
    `${API_URL}/books?populate[chapters][populate]=verses`
  );
  return data.data;
}

async function generate () {
  const books = await fetchBooks();
  await fs.ensureDir(DOCS_PATH);

  // sidebar 只保留首页
  const sidebar = ["introduction"];

  for (const book of books) {
    const slug = book.title.toLowerCase().replace(/\s+/g, "-");
    const testament = book.testament === "Old" ? "old-testament" : "new-testament";
    const bookDir = path.join(DOCS_PATH, testament, slug);
    await fs.ensureDir(bookDir);

    const sortedChapters = (book.chapters || []).sort((a, b) => a.number - b.number);

    for (const ch of sortedChapters) {
      const chapterNum = ch.number.toString().padStart(2, "0");
      const mdxFile = path.join(bookDir, `${chapterNum}.mdx`);

      // MDX 文件头完全不显示 id/title
      let mdxContent = `import { Word } from '@site/src/components/Word';\n\n`;

      const sortedVerses = (ch.verses || []).sort((a, b) => a.number - b.number);

      for (const v of sortedVerses) {
        // 用 H2 显示节号
        mdxContent += `## 第${v.number}节\n\n${renderVerseText(v)}\n\n`;
      }

      await fs.writeFile(mdxFile, mdxContent, "utf8");
    }
  }

  const sidebarContent = `module.exports = { bibleSidebar: ${JSON.stringify(sidebar, null, 2)} };`;
  await fs.writeFile(SIDEBAR_PATH, sidebarContent, "utf8");

  console.log("✅ MDX files generated! Sidebar only has intro; TOC shows verses only.");
}

generate().catch((err) => console.error(err));
