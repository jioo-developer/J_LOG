export default function Layout(props: {
  children: React.ReactNode;
  reply: React.ReactNode;
}) {
  return (
    <>
      {props.children}
      {props.reply}
    </>
  );
}
