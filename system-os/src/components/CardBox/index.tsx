import { ReactNode } from "react";

interface ICardItems {
  children: ReactNode;
  title: string
}

const CardBox = (props: ICardItems) => {
  return (
    <div className="card">
      <h1 className="title select-none">{props.title}</h1>
      {props.children}
    </div>
  )
}

export default CardBox