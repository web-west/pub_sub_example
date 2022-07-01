# Пример использования Pub/Sub
#### Установка
```$ npm i```
#### Запуск Pub сервера на порте 3000
```$ npm run pub```
#### Запуск Sub сервера на порте 3001
```$ npm run sub```
#### Запросы на Sub
Подписка на канал с именем ```send-user-data```
```$ http --verify=no GET http://localhost:3001/sub/send-user-data```

Отписка от канала с именем ```send-user-data```
```$ http --verify=no GET http://localhost:3001/unsub/send-user-data```

Отписка от всех каналов ранее подписанных
```$ http --verify=no GET http://localhost:3001/unsuball```

#### Запросы на Pub
Подписка на канал с именем ```send-user-data```
```$ http --verify=no POST http://localhost:3000/ 'name=Yurii' 'gender=male'```

## License
MIT