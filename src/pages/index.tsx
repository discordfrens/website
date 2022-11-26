import Button from '../components/ui/Button';

export default function Home() {
    return (
        <div className="flex flex-col mx-auto max-w-8xl items-center mt-[15rem]">
            <div className='mb-7'>
                <h1 className="text-6xl font-bold">Coming soon...</h1>
            </div>
            <div className="flex flex-row gap-2">
                <Button href='/github'>Github</Button>
                <Button href='/twitter'>Twitter</Button>
                <Button href='/discord'>Discord</Button>
                <Button href='/learn'>Learn</Button>
            </div>
        </div>
    );
}
