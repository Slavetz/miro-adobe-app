const box = document.querySelector('.box');
let file; // в переменную будем класть загружаемый файл
let board_id;

// выключаем дефолтный dragNdrop браузера
addListener(box, 'drag dragstart dragend dragover dragenter dragleave drop', e => {
    e.preventDefault();
    e.stopPropagation();
});
// стилизация, в т.ч. показать/спрятать кнопку загрузки
addListener(box, 'dragover dragenter', e => {
    box.classList.add('is-dragover');
});
addListener(box, 'dragleave dragend drop', e => {
    box.classList.remove('is-dragover');
});
addListener(box, 'drop', e => {
    let droppedFile = e.dataTransfer.files[0];
    // принимаем только зип-файлы
    if (droppedFile.name.replace(/.+(\.zip)/, '$1') !== '.zip') return;

    file = droppedFile;
    if (file) {
        box.classList.add('has-file');
        showFile(file);
    }
});
document.querySelector('#upload').addEventListener('change', e => {
    file = e.target.files[0];
    if (file) {
        box.classList.add('has-file');
        showFile(file);
    }
});

// показать имя выбранного файла
function showFile(file) {
    document.querySelector('.box__label').innerHTML = file ? `Выбранный файл: <br> ${file.name} <br><br><strong>Загрузить другой</strong>` : '';
}

document.querySelector('.box__error').addEventListener('click', resetUploadBox);

document.querySelector('.box__button').addEventListener('click', loadZip);

function resetUploadBox() {
    // удалить информацию о загружаемом файле из самих переменных/элементов
    file = null;
    document.querySelector('#upload').files.length = 0;
    // отобразить это на стилях .box
    box.classList.remove('is-uploading');
    box.classList.remove('is-success');
    box.classList.remove('is-error');
    box.classList.remove('has-file');
    document.querySelector('.box__label').innerHTML = '<img src="./upload.png" alt="" class="upload-pic"><br><strong>Выберите</strong><span class="box__dragndrop"> или перетащите файл</span>';
}

function showError(message) {
    box.classList.remove('is-uploading');
    box.classList.add('is-error');
    box.querySelector('.error-message').textContent = message;
}

// функция для добавления обработчика на несколько событий
function addListener(el, s, fn) {
    s.split(' ').forEach(e => el.addEventListener(e, fn, false));
}


/**=========================================**/
/**=========================================**/
/**=========================================**/
/**=========================================**/


async function loadZip() {
    // файл берется из переменной file - т.е. из dragNdrop - либо из инпута
    // если файла нет, или если это не зип, или если в данный момент происходит загрузка (случайное повторное срабатывание), ничего не делать
    file = file || document.querySelector('#upload').files[0];
    if (!file) return;
    if (file.name.replace(/.+(\.zip)/, '$1') !== '.zip') {
        showError('Принимаются только zip-архивы');
        return;
    }
    if (box.classList.contains('is-uploading')) return;
    box.classList.add('is-uploading');

    // определение id доски. Нужно для аплоада
    try {
        let boardInfo = await miro.board.info.get();
        board_id = boardInfo.id;
    } catch (e) {
        showError('Не получается определить id доски! ' + e.message);
        return;
    }

    let uploadedImages;
    // загрузка архива на heroku, получение списка картинок
    try {
        uploadedImages = await fetch(`https://miro-adobe-app.herokuapp.com/uploadpics?board_id=${board_id}`, {
            method: 'POST',
            body: file
        })
            .then(res => {
                // console.log('res после /uploadpics', res);
                if (res.status === 500) {
                    showError('Ошибка при загрузке архива на heroku!');
                    return 'Error';
                } else {
                    return res;
                }
            })
            .then(res => res.json())
            .then(res => {
                res.forEach(el=>{
                    el.url = `https://miro-adobe-app.herokuapp.com/images/${board_id}/${el.filename}`;
                });
                return res;
            })
    } catch (e) {
        showError('Ошибка при загрузке архива на heroku! ' + e.message);
        return;
    }

    box.classList.remove('is-uploading');
    box.classList.add('is-success');

    await doMagick(uploadedImages);

    resetUploadBox();

}


/**=========================================**/
/**=========================================**/
/**=========================================**/
/**=========================================**/


async function doMagick(uploadedImages) {

    let uploadedImagesObject = {};
    uploadedImages.forEach(image=>{
        uploadedImagesObject[image.filename] = image;
    });

    let existingImages = await miro.board.widgets.get({type:'IMAGE'});
    console.log("existingImages", existingImages);

    // получаем только те картинки, которые нужно удалять
    let toDelete = existingImages
        .filter(existingImage => existingImage.metadata[your_app_id].filename !== undefined)
        .filter(existingImage => !uploadedImages.find(image => image.url === existingImage.url));

    // получаем только те картинки, которые нужно обновлять
    let toUpdate = existingImages
        .filter(existingImage => existingImage.metadata[your_app_id].filename !== undefined)
        .filter(existingImage => uploadedImages.find(image => image.url === existingImage.url));

    // получаем только те картинки, которые нужно обновлять
    let toRefresh = existingImages
        .filter(existingImage => (existingImage.metadata[your_app_id].filename === undefined && existingImage.metadata[your_app_id].id !== undefined))
        .filter(existingImage => uploadedImages.find(image => image.url === existingImage.url));

    // получаем только те картинки, которые нужно создавать
    let toCreate = uploadedImages.filter(image => !existingImages.find(el => el.url === image.url));

    console.log("toDelete", toDelete);
    console.log("toUpdate", toUpdate);
    console.log("toRefresh", toRefresh);
    console.log("toCreate", toCreate);

    if (toCreate.length > 0) {
        const createdImages = await miro.board.widgets.create(toCreate.map(el => ({
            type: 'IMAGE',
            title: el.title,
            url: `https://miro-adobe-app.herokuapp.com/images/${board_id}/${el.filename}`,
            metadata: {[your_app_id]: el},
            width: el.width,
            x: el.x,
            y: el.y,
            rotation: 0
        })));
        const created = await miro.board.widgets.update(createdImages.map(image => (
            {
                id: image.id,
                metadata: {
                    [your_app_id]: Object.assign(image.metadata[your_app_id], {id: image.id})
                }
            }
        )));
        console.log("created", created);
    }

    if (toDelete.length > 0) {
        const deleted = await miro.board.widgets.update(toDelete.map((image,i) => ({
            id: image.id,
            x: -(image.metadata[your_app_id].width*2),
            y: image.metadata[your_app_id].height * 1.2 * i,
            metadata: {[your_app_id]: {}},
        })));
        console.log("deleted", deleted);
    }

    if (toUpdate.length > 0) {
        const updated = await miro.board.widgets.update(toUpdate.map(image => {
            let newImage = uploadedImagesObject[image.metadata[your_app_id].filename];
            return {
                id: image.id,
                title: newImage.title,
                url: `https://miro-adobe-app.herokuapp.com/images/${board_id}/${newImage.filename}`,
                metadata: {
                    [your_app_id]: Object.assign(newImage,{id: image.id})
                },
                width: newImage.width,
                x: newImage.x,
                y: newImage.y
            }
        }));
        console.log("updated", updated);
    }

    //todo написать toRefresh для картинок которые имеют только

}


/**=========================================**/
/**=========================================**/
/**=========================================**/
/**=========================================**/