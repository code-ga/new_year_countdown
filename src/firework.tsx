import "./firework.style.css";
export function Fireworks({ num }: { num: number }) {
  const elementReturn = [];
  for (let index = 0; index < num; index++) {
    elementReturn.push(<div class="firework"></div>);
  }
  return (
    <>{num > 0 && <div class="fireworks__background">{elementReturn}</div>}</>
  );
}
