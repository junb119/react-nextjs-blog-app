import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { remark } from "remark";
import remarkHtml from "remark-html";
console.log(path);
const postsDirectory = path.join(process.cwd(), "posts"); //path = 루트 폴더 경로
console.log(postsDirectory);
// 루트 경로에 post경로 조인
console.log("process.cwd()", process.cwd());

console.log("postsDirectory", postsDirectory);

export function getSortedPostsData() {
  //   // /posts파일 이름을 잡아주기
  console.log(fs);
  // posts 폴더까지의 경로를 읽음
  const fileNames = fs.readdirSync(postsDirectory);
  console.log("fileNames", fileNames); // ['pre-rendering.md','ssg-ssr.md']
  const allPostsData = fileNames.map((fileName) => {
    // md 확장자 삭제하고 파일이름을 id로 사용
    // pre-rendering, ssg-ssr
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName); // path에 file까지 오는 경로 저장
    const fileContents = fs.readFileSync(fullPath, "utf8"); // 파일 읽어 컨텐츠 가져오기, 인코딩 옵션 'utf8'
    const matterResult = matter(fileContents); // 가져온 md 파일컨텐츠를 객체데이터 형태로 변환
    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });
  // Sorting
  return allPostsData.sort((a, b) => {
    // post 날짜별로 정렬
    if (a.date < b.date) {
      return 1;
    } else {
      3;
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}
