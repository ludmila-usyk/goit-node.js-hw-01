# Получаем и выводим весь список контактов в виде таблицы (console.table)
node index.js --action list
https://ibb.co/2K04bwC

# Получаем контакт по id
node index.js --action get --id 5
https://ibb.co/NT92fC3

# Добавялем контакт
node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

# Удаляем контакт
node index.js --action remove --id=3