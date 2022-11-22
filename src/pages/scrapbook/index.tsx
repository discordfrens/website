//@ts-ignore
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Post } from '../../types';

export default function Scrapbook() {
    const supabase = useSupabaseClient();

    let [loading, setLoading] = useState(true);
    let [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function fetchPosts() {
        setLoading(true);

        let { data, error, status } = await supabase
            .from('scrapbook')
            .select()
            .order('created_at', { ascending: false });

        console.log('data ran', data, error, status);

        if (error) return alert('An error occurred');

        setPosts(data as Post[]);
        setLoading(false);
    }

    return (
        <main className="mx-auto my-16 max-w-7xl p-10">
            {loading ? (
                <p className="animate-pulse">...</p>
            ) : (
                <>
                    <h1 className="mb-6 text-4xl font-bold tracking-tight">
                        Scrapbook
                    </h1>
                    <section className="columns-4 gap-4 space-y-4 md:columns-4">
                        {posts && posts.length > 0 ? (
                            posts.map(
                                ({
                                    author,
                                    created_at,
                                    content,
                                    media,
                                    message_id,
                                    author_avatar,
                                    author_name,
                                }) => (
                                    <article
                                        key={message_id}
                                        className="relative rounded-lg bg-neutral-800 shadow-md shadow-black/20 overflow-hidden"
                                    >
                                        {media &&
                                            media.map(
                                                ({
                                                    url,
                                                    type,
                                                    height,
                                                    size,
                                                    width,
                                                }) => (
                                                    <div key={url}>
                                                        {type ===
                                                        'video/mp4' ? (
                                                            <video
                                                                className="w-full rounded-t-lg object-cover"
                                                                controls
                                                            >
                                                                <source
                                                                    src={url}
                                                                    type={type}
                                                                />
                                                            </video>
                                                        ) : (
                                                            <picture>
                                                                <img
                                                                    src={url}
                                                                    alt="Scrapbook Image"
                                                                    className="w-full rounded-t-lg object-cover"
                                                                />
                                                            </picture>
                                                        )}
                                                    </div>
                                                )
                                            )}

                                        {media.length > 0 && (
                                            <Link
                                                href={`/scrapbook/user/${author}`}
                                                className="absolute top-2 left-2 flex items-center space-x-2 rounded-full border border-neutral-900/10 bg-neutral-900/50 py-1 pl-1 pr-2 backdrop-blur"
                                            >
                                                <picture>
                                                    <img
                                                        src={author_avatar}
                                                        className="aspect-square h-6 w-6 rounded-full"
                                                        alt="Scrapbook Author"
                                                    />
                                                </picture>
                                                <span className="text-sm font-semibold">
                                                    {author_name}
                                                </span>
                                            </Link>
                                        )}

                                        <div className="space-y-4 p-4">
                                            {media.length < 1 && (
                                                <Link
                                                    href={`/scrapbook/user/${author}`}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <picture>
                                                        <img
                                                            src={author_avatar}
                                                            className="aspect-square h-6 w-6 rounded-full"
                                                            alt="Scrapbook Author Avatar"
                                                        />
                                                    </picture>
                                                    <span className="text-sm font-semibold">
                                                        {author_name}
                                                    </span>
                                                </Link>
                                            )}

                                            <div>
                                                {content ? (
                                                    <>
                                                        {content.length >
                                                        250 ? (
                                                            <p className="mb-3 text-gray-100">
                                                                {content.slice(
                                                                    0,
                                                                    250
                                                                )}
                                                                ...
                                                            </p>
                                                        ) : (
                                                            <p className="mb-3 text-gray-100">
                                                                {content}
                                                            </p>
                                                        )}
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>

                                            <time className="text-sm text-gray-300">
                                                {format(
                                                    new Date(created_at),
                                                    'MMM do, Y'
                                                )}
                                            </time>
                                        </div>
                                    </article>
                                )
                            )
                        ) : (
                            <p>No posts found...</p>
                        )}
                    </section>
                </>
            )}
        </main>
    );
}
