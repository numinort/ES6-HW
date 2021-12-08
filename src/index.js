/*Создать таблицу пользователей.
Пользователей получать с удаленного источника.
Таблица должна состоять из таких колонок:

имя
эмейл
телефон
кнопка детальная информация
Создать карточку пользователя детальной информации:
отобразить всю информацию о пользователе
кнопка скрыть карточку

Создать класс с методами получения данных из удаленного источника.
Создать класс таблица.
Создать класс карточка.
Каждый класс должен находиться в отдельном модуле.
Верстка для таблицы и карточки должна быть описана в соответствующих классах с использованием шаблонных строк.
*/

import { httpRequest } from "./httpRequest"

let tr = document.getElementsByTagName('tr');


class getUsers extends httpRequest {

    super() {
    }

    getAndPrint(url) {

        this.xhrUser(url)
            .then((json) => {

                const User = JSON.parse(json);

                for (let i = 0; i < User.length; i++) {
                    let UserName = User[i].name;
                    let UserEmail = User[i].email;
                    let UserPhone = User[i].phone;
                    let newTr;
                    newTr = document.createElement("tr");
                    newTr.innerHTML = `<td>${UserName}</td>\n<td>${UserEmail}</td>\n<td>${UserPhone}</td>\n<td><button>More info</button></td>`;
                    tr[i].after(newTr);

                    const button = document.getElementsByTagName('button');
                    button[i].onclick = function () {

                        let moreInfo = '';
                        const UserInfo = User[i];
                        let { id, name, username, email, address: { street, city, ...res }, phone, website, ...other } = UserInfo;

                        moreInfo = ` 
                                        id: ${id}
                                        name: ${name} 
                                        username ${username} 
                                        email: ${email} 
                                        address:
                                                street: ${street}
                                                city: ${city} 
                                        phone: ${phone} 
                                        website: ${website}`;

                        alert(moreInfo);
                    };

                };
            });


    };
}

let Users = new getUsers('https://jsonplaceholder.typicode.com/users')
Users.getAndPrint('https://jsonplaceholder.typicode.com/users')