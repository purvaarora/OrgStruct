/**
 * User avatar image for user heirarchy
 */

import { useState } from "react";

type UserAvatarProps = {
    userPhoto: string | undefined;
    altText: string;
}

export const UserAvatar = ({ userPhoto, altText }: UserAvatarProps) => {
    const [error, setError] = useState(false);

    if (error || !userPhoto)
        return <span>{altText}</span>

    return (
        <img src={userPhoto} alt={altText} onError={() => setError(true)} />
    )
}