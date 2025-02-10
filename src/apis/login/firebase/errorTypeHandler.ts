function errorTypeHandler(error: Error) {
  switch (error.message) {
    case "auth/user-not-found":
      return "등록된 사용자가 없습니다.";
    case "auth/wrong-password":
      return "비밀번호가 잘못되었습니다.";
    case "auth/network-request-failed":
      return "네트워크 요청에 실패했습니다.";
    default:
      return error.message;
  }
}

export default errorTypeHandler;
