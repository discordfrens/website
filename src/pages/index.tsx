import { RESTGetAPIUserResult } from 'discord-api-types/v10';
import { GetServerSideProps } from 'next';
import Button from '../components/ui/Button';
import { parseUser } from '../utils/utils';

interface Props {
    user: RESTGetAPIUserResult | null
}

export default function Home({ user }: Props) {
    return (
        <div className="max-w-8xl mx-auto mt-[15rem] flex flex-col items-center">
            <div className="mb-7">
                <h1 className="text-6xl font-bold">{user ? `👋 Welcome ${user.username}!` : `Coming Soon...`}</h1>
            </div>
            <div className="flex flex-row gap-2">
                <Button href={user ? `/profile`: `/login`}>
                   { user ? "View Your Profile" : "Login"}
                </Button>
                <Button href='/discord'>Discord</Button>
                <Button href='/github'>Github</Button>
                <Button href='/learn'>Learn</Button>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async function (
    ctx
) {
    const user = parseUser(ctx);
 
    return {
        props: {
            user
        },
    };
};
