import axios from "axios";

export async function postToFacebook(imageUrl, meta, pageId, token) {
    const url = `https://graph.facebook.com/${pageId}/photos`;

    const res = await axios.post(url, null, {
        params: {
            url: imageUrl,
            caption: `${meta.title}\n${meta.description}\n${meta.hashtags}`,
            access_token: token
        }
    });

    return res.data;
}
