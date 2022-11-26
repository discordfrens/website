export type Post = {
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


export type DefaultUi = {
    onClick?: () => any;
    className?: string;
    style?: CSSProperties
}

export type O<T=any> = {
    [key: string]: T
}

export type Infraction = {
    type: "mute" | "warn" | "ban" | "kick" | "unmute" | "unban";
    id: string;
    reason: string;
    timestamp: number;
    moderatorId: string;
    length?: number;
    inf_id: string;
    moderator_name: string;
    moderator_avatar: string;
}