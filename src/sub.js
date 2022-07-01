import { App } from "@tinyhttp/app";
import { json } from "milliparsec";
import PubSubClass from "./PubSubClass.js";

const PubSub = new PubSubClass(63790);
const app = new App();
app.use(json());

/**
 * Подписка на канал по имени
 */
app.get("/sub/:subname", (req, res) => {
    PubSub.sub(req.params.subname);
    return res.sendStatus(200);
});

/**
 * Отписка от канала по имени
 */
app.get("/unsub/:subname", (req, res) => {
    PubSub.unsub(req.params.subname);
    return res.sendStatus(200);
});

/**
 * Отписка от всех каналов ранее подписаных
 */
app.get("/unsuball", (req, res) => {
    PubSub.unSubAll();
    return res.sendStatus(200);
});

app.listen(3001);
