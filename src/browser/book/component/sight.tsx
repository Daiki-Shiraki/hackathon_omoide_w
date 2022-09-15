import type { FunctionComponent } from "react";

//import styles from "../css/name.module.css";

type Props = {
  name: string;
};
const Component: FunctionComponent<Props> = (props) => {
  const name = props.name;

  return <div>{name}</div>;
};

export default Component;
