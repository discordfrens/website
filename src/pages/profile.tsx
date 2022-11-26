import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { RESTGetAPIUserResult } from 'discord-api-types/v10';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Infraction } from '../types';
import { parseUser } from '../utils/utils';

type Props = {
    user: RESTGetAPIUserResult;
};
const Profile = ({ user }: Props) => {
    const supabase = useSupabaseClient();
    const [infractions, setInfractions] = useState<Infraction[]>([]);
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchInfractions();
    }, []);
    async function fetchInfractions() {
        setLoading(true);
        const { error, data } = await supabase.from('infractions').select();
        if (error) return alert(`An error occured`);
        setInfractions(data as Infraction[]);
        setLoading(false);
    }
    return (
        <div className="mx-auto mt-[4rem] max-w-2xl">
            <div className="mb-3 flex flex-row items-center gap-3 rounded-md border border-border-mid bg-foreground py-2 px-2">
                <div className="flex items-center justify-center">
                    <img
                        draggable={false}
                        className="h-20 w-20 rounded-full"
                        src={
                            user.avatar
                                ? `https://cdn.discordapp.com/avatars/${
                                      user.id
                                  }/${user.avatar}${
                                      user.avatar.startsWith('a_')
                                          ? '.gif'
                                          : '.png'
                                  }`
                                : 'https://source.boringavatars.com/'
                        }
                        alt=""
                    />
                </div>
                <div className="mb-2.5 flex flex-col">
                    <div className="mb-1 flex flex-row items-end gap-1">
                        <h1 className="text-3xl font-bold">{user.username}</h1>
                        <p className="text-base opacity-40">
                            #{user.discriminator}
                        </p>
                    </div>
                    <p className="opacity-60">
                        We dont know much about this person, but im sure they
                        are amazing!
                    </p>
                </div>
            </div>
            <div className="flex flex-row gap-2">
              <input type="text" className='bg-foreground border border-border-mid outline-none py-1 px-3 rounded-md mb-2' placeholder='Search for a warning id...' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            {loading ? (
                <p>...</p>
            ) : (
                <div className="flex flex-col gap-2">
                    {infractions.filter(f => search ? f.inf_id.includes(search) || f.reason.toLowerCase().includes(search.toLowerCase()) : true).map((infraction) => {
                        return (
                            <div className="relative min-h-[100px] rounded-md border border-border-mid bg-foreground p-3">
                                <div className="abosulte flex flex-row gap-2">
                                    <div className="h-10 flex items-center rounded-md border border-border-light bg-foreground-light py-1 px-2">
                                        <p>{infraction.inf_id}</p>
                                    </div>
                                    <div className="h-10 flex items-center rounded-md border border-border-light bg-foreground-light py-1 px-2">
                                        <p>{infraction.type}</p>
                                    </div>
                                    <div onClick={() => {
                                      window.location.href = `https://discord.com/users/${infraction.moderatorId}`
                                    }} className="h-10 flex items-center cursor-pointer rounded-md border border-border-light bg-foreground-light py-1 px-2">
                                        <div className="flex flex-row gap-2 items-center">
                                            <img
                                            className='h-7 w-7 rounded-full border border-border-light'
                                                src={ 
                                                    infraction.moderator_avatar
                                                }
                                                alt=""
                                            />
                                            <p className='text-lg mb-1'>{infraction.moderator_name}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className='mt-2'>{infraction.reason}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async function (
    ctx
) {
    const user = parseUser(ctx);
    if (!user)
        return {
            redirect: {
                destination: `/`,
                permanent: false,
            },
        };
    return {
        props: {
            user: user,
        },
    };
};

export default Profile;
