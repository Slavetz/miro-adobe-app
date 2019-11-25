const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const rtbOauth = require('./src/oauth.js');
const AdmZip = require('adm-zip');

const mkdirp = require('mkdirp');

const PORT = process.env.PORT || 5000;

let app = express()
	.use(cors())
	.use('/app', express.static('app'))
	.use('/images', express.static(path.join(__dirname, 'images')))
	.get('/oauth', oauth)
	.post('/uploadpics', uploadPics)
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));


/**
 * принимает архив, в котором есть images.json и какое-то количество jpg-файлов
 * Пишет файлы в папку images/:board_id/
 * Содержимое json отправляет обратно для создания виджетов на доске
 * */
function uploadPics(req, res) {
	const board_id = req.query.board_id; // id доски передается в query

	if (!board_id) {
		res.status(500).send({error: 'Не был передан id доски'});
	}

	// в реквесте приходит zip-файл. Записываем его в папку images под именем id доски
	req.pipe(fs.createWriteStream(`images/${board_id}.zip`))
		.on('close', () => {
			console.log('записали zip:', `images/${board_id}.zip`);
            afterZipAdded(board_id);
		})
		.on('error', e => {
			console.log('error!', e);
			res.status(500).send({error: e});
		});


	function afterZipAdded(board_id) {

        // создаем (если нет) папку под именем id доски
        mkdirp(`images/${board_id}`, err => {
            if (err) console.error(err);
            else console.log('создана или существует папка', `images/${board_id}`);
        });


        // читаем файл
        let zip;
        let zipEntries;
        try {
            zip = new AdmZip(`images/${board_id}.zip`);
            zipEntries = zip.getEntries();
            console.log(JSON.stringify(zipEntries));
        } catch (e) {
            console.error(e);
            res.status(500).send({error: e});
            return;
        }

        let res_string;

        // проходимся по содержимому архива
        zipEntries.forEach(function (zipEntry, i) {

            // в архиве есть images.json и какое-то количество jpg-файлов
			// json содержит список картинок с размерами и координатами. Превращаем его в строку и пишем в переменную res_string, чтобы отправить обратно

            // console.log(zipEntry.name);

            if (zipEntry.name === "images.json") {
                res_string = zipEntry.getData().toString('utf8');
            }

            // джипеги пишем в папку под названием id доски
            if (zipEntry.entryName.includes(".jpg")) {
                let file = zipEntry.getData();
                try {
                    fs.writeFileSync(`images/${board_id}/` + zipEntry.name, file)
				} catch (e) {
                    console.log('ошибка при записи файла!', e);
                }
            }

			// джипеги пишем в папку под названием id доски
			if (zipEntry.entryName.includes(".png")) {
				let file = zipEntry.getData();
				try {
					fs.writeFileSync(`images/${board_id}/` + zipEntry.name, file)
				} catch (e) {
					console.log('ошибка при записи файла!', e);
				}
			}

            if ( i === zipEntries.length - 1 ) {
                console.log('последний zipEntry');
                if (!res_string) {
                    res.status(500).send('Отсутствует images.json');
                } else {
                    res.status(200).send(res_string);
                }
            }

        });

    }

}


function oauth(req, res) {

	console.log("req.query.code", req.query.code, "req.query.client_id", req.query.client_id);

	rtbOauth.getToken(req.query.code, req.query.client_id)
		.then((response) => {
			console.log('oauth.response = ', response);
			// if (response) { db.addAuthorization(response) }
			res.send('response: ' + JSON.stringify(response))
		});

}

