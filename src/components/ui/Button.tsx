import { DefaultUi } from "../../types";

type Props = {
  children: string;
  href?: string;
} & DefaultUi

const Button = ({ children, className, href, onClick, style }: Props) => {
  return <a href={href} onClick={() =>{
    if(onClick){
      onClick()
    }
  }} className={`${className} py-1 px-2 transition ease-out duration-200 cursor-pointer rounded border hover:bg-[#353535] hover:border-[#515156] border-neutral-700 bg-neutral-800`} style={style}>{children}</a>
}

export default Button;