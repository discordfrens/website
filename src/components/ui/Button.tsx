import { DefaultUi } from '../../types';

type Props = {
    href?: string;
    children: string;
    icon?: JSX.Element
} & DefaultUi;
const Button = ({ children, className, href, onClick, style, icon }: Props) => {
    return (
        <a
            href={href}
            onClick={() => (onClick ? onClick() : null)}
            style={style}
            className={`${className} ${icon ? `hover:pr-3.5 pr-[0px] flex flex-row gap-2` : ""} items-center btn bounce cursor-pointer rounded-md border border-border bg-foreground py-[4px] px-4 hover:border-border-light hover:bg-border`}
        >
            {children}
            {icon}
        </a>
    );
};

export default Button;
