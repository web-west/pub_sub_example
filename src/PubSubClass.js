import Redis from "ioredis";

export default class PubSubClass {
    constructor(config) {
        this.config = config;
        this.redis = new Redis(config ?? null);
        this.subs = [];
    }

    /**
     * Метод публикующий сообщение в канал
     * @param {*} name // имя канала
     * @param {*} message // сообщение
     */
    set(name, message) {
        this.redis.publish(name, message);
    }

    /**
     * Локальный метод выставляющий слушатель сообщений
     */
    async _on() {
        await this.redis.on("message", (channel, message) => {
            console.log(`Received message from ${channel} channel.`);
            console.log(JSON.parse(message));
        });
    }

    /**
     * Подписка на канал по имени
     * @param {*} name // имя канала
     */
    async sub(name) {
        await this.redis.subscribe(name, (err, count) => {
            if (err) console.error(err.message);
            console.log(`Subscribed to ${count} channels.`);
            // Вызов слушателя сообщений
            this._on();
            // Сохраняем имя в массиве каналов
            this.subs.push(name);
        });
    }

    /**
     * Отписка от канала по имени
     * @param {*} name // имя канала
     */
    async unsub(name) {
        await this.redis.unsubscribe(name, (err, count) => {
            if (err) console.error(err.message);
            console.log(`Unsubscribed to ${count} channels.`);
        });
    }

    /**
     * Отписка от всех каналов ранее подписаных
     */
    async unSubAll() {
        for(let name of this.subs) {
            await this.redis.unsubscribe(name, (err, count) => {
                if (err) console.error(err.message);
                console.log(`Unsubscribed to ${count} channels.`);
                
                // Удаляем елемент массива с именем канала
                let ind = this.subs.indexOf('two');
                if (ind !== -1) {
                    this.subs.splice(ind, 1);
                }
            });
        }
    }
}