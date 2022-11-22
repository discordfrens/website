export type Post = {
    id: string;
    author: string;
    created_at: string;
    content: string;
    media: PostMedia[];
    message_id: string;
    author_avatar: string;
    author_name: string;
};

export type PostMedia = {
    url: string;
    type: string;
    height: number;
    size: number;
    width: number;
};
