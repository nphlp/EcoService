type LogoProps = {
    className?: string;
};

export default function Logo(props: LogoProps) {
    const { className } = props;

    return (
        <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="#0E073B" />
            <circle cx="57" cy="50" r="43" fill="#1082C0" />
            <circle cx="62" cy="55" r="36" fill="#4ED6FC" />
            <circle cx="62" cy="62" r="29" fill="white" />
        </svg>
    );
}
