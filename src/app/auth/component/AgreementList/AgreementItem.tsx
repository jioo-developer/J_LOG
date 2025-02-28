import CommonCheckbox from "@/components/atoms/CommonCheckbox/CommonCheckbox";

type propsType = {
  item: any;
  index: number;
  isChecked: boolean;
  onChange: (index: number) => void;
};

export default function AgreementItem<T>({
  item,
  index,
  isChecked,
  onChange,
}: propsType) {
  return (
    <div className="check__item flex-Set">
      <CommonCheckbox
        testId={item.id}
        stateValue={isChecked}
        setStateHandler={() => onChange(index)}
      />
      <p className={`check_desc ${item.important && "important-Mark"}`}>
        {item.text}
      </p>
    </div>
  );
}
