import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

import Image from 'next/image'
import { format } from 'date-fns' 

export default function Scrapbook() {
    const supabase = useSupabaseClient()

    let [posts, setPosts] = useState()
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPosts()
    }, [])

    async function fetchPosts() {
        setLoading(true)
        
        let { data, error, status } = await supabase
            .from('scrapbook')
            .select()
            .order('created_at', { ascending: false })
        
        console.log('data ran', data, error, status)
        
        if (error) return alert('An error occured');

        setPosts(data)
        setLoading(false)
    }

    return (
        <main className="max-w-7xl mx-auto my-16">
            {loading && <p>Loading...</p>}

            <section className="columns-1 md:columns-4 gap-4 space-y-4">
                {posts && posts.map(({ id, author, created_at, content, media, message_id, author_avatar, author_name }) => (
                    <article
                        key={id}
                        className="rounded-lg bg-neutral-800 relative shadow-md shadow-black/20"
                    >
                        {media && media.map(({ url, type, height, size, width}) => (
                            <div>
                                {type === 'video/mp4' ? (
                                    <video className="w-full rounded-t-lg object-cover" controls>
                                        <source src={url} type={type} />
                                    </video>
                                ) : (
                                    <img src={url} alt="Scrapbook Image" className="w-full rounded-t-lg object-cover" />
                                )}
                            </div>
                        ))}

                        {media.length > 0 && (
                            <a href={`/scrapbook/user/${author}`} className="flex space-x-2 items-center absolute top-2 left-2 border border-neutral-900/10 bg-neutral-900/50 backdrop-blur py-1 pl-1 pr-2 rounded-full">
                                    <img src={author_avatar} className="h-6 w-6 aspect-square rounded-full" />
                                    <span className="text-sm">{author_name}</span>
                            </a>
                        )}

                        <div className="space-y-4 p-4">
                            {media.length < 1 && (
                                <a href={`/scrapbook/user/${author}`} className="flex space-x-2 items-center">
                                        <img src={author_avatar} className="h-6 w-6 aspect-square rounded-full" />
                                        <span className="">{author_name}</span>
                                </a>
                            )}

                            <p className="">{content}</p>

                            {format(new Date(created_at), 'MMM do')}
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}