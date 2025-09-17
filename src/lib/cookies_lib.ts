import Cookies from "js-cookie";

// 기본 쿠키 만들기
Cookies.set("이름", "김코딩");

// 만료 날짜가 있는 쿠키 만들기 (7일 후에 사라져요)
Cookies.set("좋아하는색", "파란색", { expires: 7 });

// 특정 경로에만 쿠키 적용하기
Cookies.set("동물", "강아지", { path: "/게임" });

// 쿠키 값 읽기
const 이름 = Cookies.get("이름"); // '김코딩'
console.log("내 이름은 " + 이름 + "이에요!");

// 모든 쿠키 가져오기
const 모든쿠키 = Cookies.get();
console.log(모든쿠키); // {이름: '김코딩', 좋아하는색: '파란색', ...}

// 쿠키 지우기
Cookies.remove("이름");

// 특정 경로의 쿠키 지우기
Cookies.remove("동물", { path: "/게임" });
