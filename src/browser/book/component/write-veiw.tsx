import { FunctionComponent} from "react";

type Props = {
    write: boolean;
}
const Component: FunctionComponent<Props> = (props) => {
    const write = props.write;
};

export default Component;