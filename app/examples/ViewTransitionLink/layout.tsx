import { ViewTransitions } from "next-view-transitions";
import "./transition.css";

type ViewTransitionLayoutProps = {
    children: React.ReactNode;
};

export default function Layout(props: ViewTransitionLayoutProps) {
    const { children } = props;

    return <ViewTransitions>{children}</ViewTransitions>;
}
