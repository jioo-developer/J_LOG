function Priority() {
  const { CashData } = useCashQueryHook();

  const isCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (getData.item > 0) {
      setPriorty(e.target.checked);
    } else {
      popuprHandler({
        message: "아이템을 보유 하고 있지 않습니다, 구매하러 가시겠습니까?",
        type: "confirm",
      });
      e.target.checked = false;
    }
  };

  const isClick = popupMessageStore().isClick;

  useEffect(() => {
    if (isClick) {
      router.push("/member/mypage");
      popupInit();
    }
  }, [isClick]);

  return (
    <div className="use__item">
      <input
        type="checkbox"
        className="eachCheckbox"
        id="use__Check"
        onChange={(e) => {
          isCheckHandler(e);
        }}
      />
      <label htmlFor="use__Check" className="check">
        <p>노출 우선권 사용하기</p>
      </label>
    </div>
  );
}

export default Priority;
