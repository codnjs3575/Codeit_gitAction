import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from ".";
import { useState } from "react";

test("Input 컴포넌트 미입력 시 X 버튼이 보이지 않아야 함", () => {
  // render(<Input onChange={() => {}} onDelete={() => {}} />);
  render(<Input onChange={jest.fn()} onDelete={jest.fn()} />);

  const deleteBtn = screen.queryByRole("button", { name: "입력값 지우기" });
  const input = screen.getByRole("textbox");

  expect(input).toHaveValue("");
  expect(deleteBtn).not.toBeInTheDocument();
});

// test("Input 컴포넌트에 입력값이 있을 때 X 버튼이 보이는지 확인", () => {
//   render(<Input onChange={jest.fn()} onDelete={jest.fn()} />);

//   const deleteBtn = screen.queryByRole("button", { name: "입력값 지우기" });
//   const input = screen.getByRole("textbox");

//   expect(input).toHaveValue("입력값");
//   expect(deleteBtn).toBeInTheDocument();
// });

// test("X 버튼을 클릭했을 때 입력값이 지워지는지 확인", () => {
//   render(<Input onChange={jest.fn()} onDelete={jest.fn()} />);

//   const deleteBtn = screen.queryByRole("button", { name: "입력값 지우기" });
//   const input = screen.getByRole("textbox");

//   expect(input).toHaveValue("입력값");
//   fireEvent.click(deleteBtn!);
//   expect(input).toHaveValue("");
//   expect(deleteBtn).not.toBeInTheDocument();
// });

test("X 버튼 클릭 시 onDelete props에 전달된 함수가 호출되는지 확인한다.", () => {
  const onDelete = jest.fn();
  render(<Input value="입력값" onChange={jest.fn()} onDelete={onDelete} />);

  const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

  // X 버튼 클릭
  fireEvent.click(deleteButton);

  // onDelete 함수가 호출된다.
  expect(onDelete).toHaveBeenCalled();
});

test("X 버튼 클릭 시 입력값이 지워지는지 확인한다", () => {
  // 삭제 기능을 테스트하기 위해 Wrapper 컴포넌트를 생성
  const Wrapper = () => {
    const [value, setValue] = useState("입력값");
    const handleDelete = () => setValue("");

    return (
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onDelete={handleDelete}
      />
    );
  };
  render(<Wrapper />);

  const input = screen.getByRole("textbox");
  const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

  // X 버튼 클릭
  fireEvent.click(deleteButton);

  // 입력값이 지워지고,
  expect(input).toHaveValue("");
  // X 버튼이 사라진다.
  expect(deleteButton).not.toBeInTheDocument();
});

test("Input 컴포넌트 에러 발생 시 에러 메세지가 보이는지 확인", () => {
  render(
    <Input
      onChange={jest.fn()}
      onDelete={jest.fn()}
      isError={true}
      errorMessage={"입력값에 문제가 있습니다."}
    />,
  );

  const errorMessage = screen.getByText("입력값에 문제가 있습니다.");
  expect(errorMessage).toBeInTheDocument();
});
