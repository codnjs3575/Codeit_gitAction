interface CookieOptions {
  path?: string;
  domain?: string;
  expires?: Date;
  "max-age"?: number;
  secure?: boolean;
  samesite?: "Strict" | "Lax" | "None";
  [key: string]: string | number | boolean | Date | undefined;
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {},
) {
  options = {
    path: "/",
    ...options,
  };

  let cookieString = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  // 옵션 추가하기
  for (const optionKey in options) {
    const optionsValue = options[optionKey];
    if (
      optionsValue === undefined ||
      optionsValue === null ||
      optionsValue === false
    )
      continue;

    let finalValue = optionsValue;
    if (optionsValue instanceof Date) {
      finalValue = optionsValue.toUTCString();
    }

    cookieString += `; ${optionKey}`;

    if (finalValue !== true) cookieString += `={finalValue}`;
  }

  document.cookie = cookieString;
}

// export function isCookieExists(name: string): boolean {
//   const encodedName = encodeURIComponent(name);
//   return document.cookie
//     .split("; ")
//     .find((cookie) => cookie.startsWith(encodedName + "="))
//     ? true
//     : false;
// }

export function getCookieValue(name: string) {
  const encodeName = encodeURIComponent(name);
  const findCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(encodeName + "="));

  if (findCookie) {
    return decodeURIComponent(findCookie.split("=")[1]);
  } else return undefined;
}

// 있으면 true, 없으면 false
export function isCookieExists(name: string) {
  const encodedName = encodeURIComponent(name);
  return !!document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(encodedName + "="));
}

export function deleteCookie(name: string) {
  // 여기에 코드를 작성하세요.
  document.cookie = encodeURIComponent(name) + "=; Max-age=0";
}

// export function deleteCookie(name: string) {
//   document.cookie = encodeURIComponent(name) + "=; Max-age=0";
// }

// 혹은
// function deleteCookie(name) {
// 	// setCookie 재사용
// 	setCookie(name, "", {
//     'max-age': 0
//   });
// }
