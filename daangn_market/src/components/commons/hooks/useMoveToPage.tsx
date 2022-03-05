import { useRouter } from "next/router";
import { useState } from "react";

type IPage = "/board" | "/market" | "/mypage";
// 유니온 타입 합집함
// ??? 교집합

// 오류 검증
// 타입과 인터페이스의 차이, 인터페이스는 객체, 선언 병합 :  인터페이스는 중복되면 하나로 합쳐질 수 있다. 타입은 할 수 없음.

// interface AAA {
//     name: string
//     age: number
// }

// interface AAA {
//     school: string
// }

export function useMoveToPage() {
  const router = useRouter();
  const [visitedPage, setVisitedPage] = useState("/");
  // 시작점 루트
  // 로그인 페이지는 저장 안 시키고 저장 시킨다음에 라우터 푸시하기

  const moveToPage = (page: IPage) => () => {
    setVisitedPage(page);
    router.push(page);
  };

  return { moveToPage, visitedPage };
}
