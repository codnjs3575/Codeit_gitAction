// import { fireEvent, render, screen } from "@testing-library/react";
// import Home from "./page";

// describe("Home 페이지 테스트", () => {
//   test("첫 렌더링 시 초기값은 0이다.", () => {
//     render(<Home />);
//     expect(screen.getByText("Count: 0")).toBeInTheDocument();
//   });

//   test("증가 버튼 클릭 시 카운트가 증가해야 한다.", () => {
//     render(<Home />);
//     const incrementButton = screen.getByText("증가");
//     fireEvent.click(incrementButton);
//     expect(screen.getByText("Count: 1")).toBeInTheDocument();
//   });

//   test("감소 버튼 클릭 시 카운트가 감소해야 한다.", () => {
//     render(<Home />);
//     const decrementButton = screen.getByText("감소");
//     fireEvent.click(decrementButton);
//     expect(screen.getByText("Count: -1")).toBeInTheDocument();
//   });
// });

// describe("CartPage 컴포넌트 테스트", () => {
//   test("로그인하지 않은 상태에서 추가 버튼 클릭 시 경고하는 alert 생성하는지 확인", () => {
//     const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
//     render(<Home />);

//     const addBtn = screen.getByRole("button", { name: "추가" });
//     fireEvent.click(addBtn);

//     expect(alertMock).toHaveBeenCalledWith(
//       "로그인하지 않으면 추가할 수 없습니다.",
//     );
//     alertMock.mockRestore();
//   });

//   test("로그인 후 추가 버튼 클릭 시 count 증가되는지 확인", () => {
//     render(<Home />);

//     const loginBtn = screen.getByRole("button", { name: "로그인" });
//     fireEvent.click(loginBtn);
//     expect(screen.getByText("로그인됨: user@example.com")).toBeInTheDocument();

//     const addBtn = screen.getByRole("button", { name: "추가" });
//     fireEvent.click(addBtn);
//     expect(screen.getByText("상품 개수: 1")).toBeInTheDocument();
//   });

//   test("상품이 0개일 때 제거 버튼 비활성화", () => {
//     render(<Home />);

//     const removeBtn = screen.getByRole("button", { name: "제거" });
//     expect(removeBtn).toBeDisabled();
//   });

//   test("상품 추가(로그인된 상태) 후 제거 시 counter 감소", () => {
//     render(<Home />);

//     const loginBtn = screen.getByRole("button", { name: "로그인" });
//     fireEvent.click(loginBtn);
//     expect(screen.getByText("로그인됨: user@example.com")).toBeInTheDocument();

//     const addBtn = screen.getByRole("button", { name: "추가" });
//     fireEvent.click(addBtn);
//     fireEvent.click(addBtn);

//     const removeBtn = screen.getByRole("button", { name: "제거" });
//     fireEvent.click(removeBtn);
//     expect(screen.getByText("상품 개수: 1")).toBeInTheDocument();
//   });
// });

// import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import Home from "./page";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const createTestQueryClient = () =>
//   new QueryClient({
//     defaultOptions: {
//       queries: {
//         retry: false, // 테스트에서 재시도 비활성화
//         gcTime: Infinity, // Jest 환경에서 카비지 컬렉션을 위한 타이머 생성 방지
//       },
//     },
//   });

// const renderWithQueryClient = (component: React.ReactElement) => {
//   // 각 테스트마다 새로운 QueryClient 생성하여 독립적인 상태 유지 (useState 없이)
//   const testQueryClient = createTestQueryClient();

//   return render(
//     <QueryClientProvider client={testQueryClient}>
//       {component}
//     </QueryClientProvider>,
//   );
// };

// describe("메인 페이지 테스트", () => {
//   describe("데이터 렌더링 테스트", () => {
//     test("로딩 상태가 올바르게 표시되는지 확인", () => {
//       renderWithQueryClient(<Home />);

//       const loadingElement = screen.getByText("Loading...");
//       expect(loadingElement).toBeInTheDocument();
//     });

//     test("데이터가 성공적으로 로드되고 표시되는지 확인", async () => {
//       // 실제 API 호출 방지를 위한 모킹
//       // 모킹을 하지 않으면 어떻게 서버를 켜야만 테스트가 동작합니다.
//       const mockedPosts = [
//         { id: 1, title: "테스트 제목", body: "테스트 본문" },
//         { id: 2, title: "두번째 제목", body: "두번째 본문" },
//       ];

//       global.fetch = jest.fn().mockResolvedValueOnce({
//         ok: true,
//         json: jest.fn().mockResolvedValueOnce(mockedPosts),
//       });

//       renderWithQueryClient(<Home />);

//       await waitFor(() => {
//         // li 요소가 올바르게 렌더링되었는지 확인
//         const postItems = screen.getAllByRole("listitem");
//         // li 요소의 개수가 mockedPosts의 데이터 개수와 일치하는지 확인
//         expect(postItems).toHaveLength(mockedPosts.length);
//         // 각 포스트의 제목이 올바르게 표시되는지 확인
//         expect(screen.getByText("1: 테스트 제목")).toBeInTheDocument();
//         expect(screen.getByText("2: 두번째 제목")).toBeInTheDocument();
//       });
//     });

//     test("API 호출 실패 시 에러 상태가 올바르게 표시되는지 확인", async () => {
//       // API 호출 실패를 모킹
//       global.fetch = jest.fn().mockResolvedValue({
//         ok: false,
//       });

//       renderWithQueryClient(<Home />);

//       await waitFor(() => {
//         const errorElement = screen.getByText(
//           "서버에서 데이터를 가져오는 데 실패했습니다.",
//         );
//         expect(errorElement).toBeInTheDocument();
//       });
//     });
//   });

//   describe("게시물 생성 테스트", () => {
//     test("새 게시물이 성공적으로 생성되는지 확인", async () => {
//       const initialPosts = [
//         { id: 1, title: "테스트 제목", body: "테스트 본문" },
//         { id: 2, title: "두번째 제목", body: "두번째 본문" },
//       ];

//       const newPost = { id: 3, title: "새로운 제목", body: "새로운 본문" };
//       // 첫 번째: API GET 요청
//       global.fetch = jest.fn().mockResolvedValueOnce({
//         ok: true,
//         json: jest.fn().mockResolvedValueOnce(initialPosts),
//       });

//       renderWithQueryClient(<Home />);

//       await waitFor(() => {
//         // li 요소가 올바르게 렌더링되었는지 확인
//         const postItems = screen.getAllByRole("listitem");
//         // li 요소의 개수가 mockedPosts의 데이터 개수와 일치하는지 확인
//         expect(postItems).toHaveLength(initialPosts.length);
//         // 각 포스트의 제목이 올바르게 표시되는지 확인
//         expect(screen.getByText("1: 테스트 제목")).toBeInTheDocument();
//         expect(screen.getByText("2: 두번째 제목")).toBeInTheDocument();
//       });

//       // 폼 입력 및 제출
//       const titleInput = screen.getByLabelText("제목");
//       const bodyInput = screen.getByLabelText("본문");
//       const submitButton = screen.getByRole("button", { name: "제출" });

//       // 입력값 설정
//       fireEvent.change(titleInput, { target: { value: "새로운 제목" } });
//       fireEvent.change(bodyInput, { target: { value: "새로운 본문" } });

//       // API 모킹 후 렌더링
//       global.fetch = jest
//         // 두 번째: POST 요청
//         .fn()
//         .mockResolvedValueOnce({
//           ok: true,
//           json: jest.fn().mockResolvedValueOnce(newPost),
//         })
//         .mockResolvedValueOnce({
//           // 세 번째: invalidateQueries 후 GET 요청
//           ok: true,
//           json: jest.fn().mockResolvedValueOnce([...initialPosts, newPost]),
//         });

//       fireEvent.click(submitButton);

//       // 새 게시물이 추가되었는지 확인
//       await waitFor(() => {
//         const postItems = screen.getAllByRole("listitem");
//         expect(postItems).toHaveLength(initialPosts.length + 1); // 기존 2개 + 새로 추가된 1개
//         // 새 게시물의 제목과 본문이 올바르게 표시되는지 확인
//         expect(screen.getByText("3: 새로운 제목")).toBeInTheDocument();
//         expect(screen.getByText("새로운 본문")).toBeInTheDocument();
//       });
//     });
//   });
// });

// src/app/page.test.tsx

import { render, screen } from "@testing-library/react";
import Home from "./page";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";

describe("MSW 모킹 테스트", () => {
  // test("fetch API 모킹 테스트", async () => {
  //   render(<Home />);

  //   const postListItems = await screen.findAllByRole("listitem");
  //   // MSW에 모킹된 데이터는 2개
  //   expect(postListItems).toHaveLength(2);

  //   // MSW에서 설정한 결과값이 화면에 잘 나오는지 확인
  //   expect(screen.getByText("1: 첫 번째 게시글")).toBeInTheDocument();
  //   expect(screen.getByText("2: 두 번째 게시글")).toBeInTheDocument();
  // });
  test("MSW 상세 데이터 모킹", async () => {
    render(<Home />);

    const postItem = await screen.findByText("1: 첫 번째 게시글");

    // MSW에서 설정한 결과값이 화면에 잘 나오는지 확인
    expect(postItem).toBeInTheDocument();
  });

  test("네트워크 에러 발생 시 모킹 테스트", async () => {
    // 모킹을 직접 해줘야 함
    server.use(
      http.get("http://localhost:4000/posts/1", () => {
        return HttpResponse.error();
      }),
    );

    render(<Home />);

    const errorMessage =
      await screen.findByText("데이터를 불러오는데 실패했습니다.");

    // 에러 메시지가 화면에 잘 나오는지 확인
    expect(errorMessage).toBeInTheDocument();
  });

  test("서버 에러 시 모킹 테스트", async () => {
    server.use(
      http.get("http://localhost:4000/posts/1", () => {
        // 백엔드에서 반환하는 값은 없고 (null)
        // 상태 코드가 500으로 반환 -> catch 블록으로 이동
        return HttpResponse.json(null, { status: 500 });
      }),
    );

    render(<Home />);

    const errorMessage =
      await screen.findByText("데이터를 불러오는데 실패했습니다.");

    // 에러 메시지가 화면에 잘 나오는지 확인
    expect(errorMessage).toBeInTheDocument();
  });
});
