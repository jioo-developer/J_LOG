describe("로그인 e2e 테스트를 진행합니다.", () => {
  const baseurl = "https://j-log-rosy.vercel.app";
  beforeEach(() => {
    cy.visit(baseurl); // 로그인 페이지로 이동
  });
  it("로그인 페이지가 정상적으로 렌더링되어야 한다", () => {
    // 기본 폼 랜더링
    cy.get('[data-testid="form-test"]').should("exist");
    cy.get('[data-testid="emailRequired"]').should("exist");
    cy.get('[data-testid="passwordRequired"]').should("exist");
    cy.get("button").contains("로그인").should("exist");
    // 기본 폼 랜더링

    // sns-login 버튼 랜더링
    cy.get('[data-testid="google-login"]').should("exist");
    cy.get('[data-testid="facebook-login"]').should("exist");
    // sns-login 버튼 랜더링

    //비밀번호 찾기 & 회원가입 버튼 랜더링
    cy.contains("비밀번호 변경&찾기").should("exist");
    cy.contains("회원가입").should("exist");
  });

  it("로그인 버튼을 누를 시 로그인을 하고 페이지 이동을 정상적으로 하는 지 테스트 합니다.", () => {
    // Postlogin 요청을 모의(mock)하여 성공 시 동작을 시뮬레이션

    cy.get('[data-testid="emailRequired"]')
      .type("test@naver.com")
      .should("have.value", "test@naver.com"); // 입력된 값 검증

    cy.get('[data-testid="passwordRequired"]')
      .type("123456789")
      .should("have.value", "123456789"); // 입력된 값 검증

    cy.login({ email: "test@naver.com", password: "123456789" });
  });

  // it("잘못된 로그인 정보 입력 시, 에러 팝업이 정상적으로 출력 되는 지 테스트 합니다", () => {
  //   cy.intercept("POST", "/api/login", {
  //     statusCode: 400,
  //     body: { message: "잘못된 이메일 또는 비밀번호" },
  //   }).as("loginRequest");

  //   cy.get('[data-testid="emailRequired"]').type("test@example.com");
  //   cy.get('[data-testid="passwordRequired"]').type("wrongpassword");
  //   cy.get('[data-testid="form-test"]').submit();

  //   cy.wait("@loginRequest");

  //   // 로그인 실패 시 팝업 표시 확인
  //   cy.get("[data-testid="popup-test"]").should("exist");
  // });
});
