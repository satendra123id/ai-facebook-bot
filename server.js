import express from "express";
import bodyParser from "body-parser";
import { generateAIImage } from "./utils/ai.js";
import { postToFacebook } from "./utils/facebook.js";
import { generateMeta } from "./utils/meta.js";

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {
    try {
        const { message, pageId, fbToken } = req.body;

        const imageUrl = await generateAIImage(message);
        const meta = generateMeta(message);

        const fb = await postToFacebook(imageUrl, meta, pageId, fbToken);

        res.json({
            success: true,
            imageUrl,
            meta,
            fb
        });

    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/public/index.html");
});
