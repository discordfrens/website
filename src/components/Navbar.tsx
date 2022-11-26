import Button from './ui/Button';

type Props = {};
const Navbar = ({}: Props) => {
    return (
        <div className="flex flex-row justify-between p-4 border-b border-b-neutral-800">
            <div className='flex items-center'>
                <h1 className="text-xl font-bold">Frens</h1>
            </div>
            <div className='flex flex-row gap-2'>
                <Button>Discord</Button>
                <Button>Twitter</Button>
                <Button>Github</Button>
            </div>
        </div>
    );
};

export default Navbar;
