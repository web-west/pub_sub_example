import { App } from "@tinyhttp/app";
import { json } from "milliparsec";
import PubSubClass from "./PubSubClass.js";

const PubSub = new PubSubClass();
const app = new App();
app.use(json());

/**
 * Публикуем сообщение на канал
 */
app.post("/", (req, res) => {
    PubSub.set("send-user-data", JSON.stringify({ ...req.body }));
    return res.sendStatus(200);
});

app.listen(3000);