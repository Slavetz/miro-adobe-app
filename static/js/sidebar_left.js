const zipInput = document.querySelector('#zip_input');
const uploadButton = document.querySelector('#upload_button');
const box = document.querySelector('#upload_box');
let board_id;

zipInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) {
        uploadButton.removeAttribute('disabled');
        box.classList.add('has-file');
    } else {
        resetUploadBox();
    }
});

/**=========================================**/
/**=========================================**/
/**=========================================**/
/**=========================================**/

function resetUploadBox() {
    // удалить информацию о загружаемом файле из самих переменных/элементов
    zipInput.files.length = 0;
    zipInput.value = '';
    uploadButton.setAttribute('disabled','disabled');
    // отобразить это на стилях .box
    box.classList.remove('is-uploading');
    box.classList.remove('is-success');
    box.classList.remove('is-error');
    box.classList.remove('has-file');
}


async function loadZip() {

    // файл берется из переменной file - т.е. из dragNdrop - либо из инпута
    // если файла нет, или если это не зип, или если в данный момент происходит загрузка (случайное повторное срабатывание), ничего не делать

    const file = zipInput.files[0];
    if (!file) return;

    if (box.classList.contains('is-uploading')) return;
    box.classList.add('is-uploading');

    const uploadedImages = await upploadZipToHeroku(file);

    box.classList.remove('is-uploading');
    box.classList.add('is-success');

    await doMagick(uploadedImages);

    resetUploadBox();

}

async function upploadZipToHeroku (file){

    // определение id доски. Нужно для аплоада
    try {
        let boardInfo = await miro.board.info.get();
        board_id = boardInfo.id;
    } catch (e) {
        showError('Не получается определить id доски! ' + e.message);
        return;
    }

    return await fetch(`https://miro-adobe-app.herokuapp.com/uploadpics?board_id=${board_id}`, {
        method: 'POST',
        body: file
    })
        .then(res => {
            // console.log('res после /uploadpics', res);
            if (res.status === 500) {
                return new Error('Error: Ошибка при загрузке архива на heroku!');
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
        }).catch(e=>{
            showError('Ошибка при загрузке архива на heroku! ' + e.message);
            return;
        });


}


/**=========================================**/
/**=========================================**/
/**=========================================**/
/**=========================================**/


async function doMagick(uploadedImages) {

    /** Объект для быстрого сопоставления по ключу */
    let uploadedImagesObject = {};
    uploadedImages.forEach(image=>{
        uploadedImagesObject[image.filename] = image;
    });

    /** Все картинки которые есть на доске */
    let existingImages = await miro.board.widgets.get({type:'IMAGE'});
    console.log('existingImages', existingImages);

    /** Только origin картинки которые есть на доске */
    //let existingOriginImages = existingImages
    //  .filter(image => image.metadata[your_app_id].origin === true);
    let existingOriginImages = await miro.board.widgets.get({type:'IMAGE', metadata:{[your_app_id]:{origin: true}}});
    console.log('existingOriginImages', existingOriginImages);

    /** Только те картинки которые есть в загруженных но отсутсвуют на доске как origin */
    let toCreate = uploadedImages
        .filter(image => !existingOriginImages.find(el => el.url === image.url));
    console.log("toCreate",toCreate);

    /** Только те картинки которые origin но отсутсвуют в загруженных */
    let toDelete = existingOriginImages
        .filter(originImage => !uploadedImages.find(image => image.url === originImage.url));
    console.log("toDelete",toDelete);

    /** Только те картинки которые origin и есть в загруженных */
    // получаем только те картинки, которые нужно обновлять
    let toUpdate = existingOriginImages
        .filter(originImage => uploadedImages.find(image => image.url === originImage.url));
    console.log("toUpdate",toUpdate);

    /** Только те картинки которые есть на доске и в загруженных и пофиг origin или не origin */
    let toReload = existingImages
        .filter(existingImage => uploadedImages.find(image => image.url === existingImage.url));
    console.log("toReload",toReload);

    if (toCreate.length > 0) {
        miro.board.widgets.create(toCreate.map(el => ({
            type: 'IMAGE',
            title: el.title,
            url: `https://miro-adobe-app.herokuapp.com/images/${board_id}/${el.filename}`,
            metadata: {[your_app_id]: Object.assign(el,{origin:true})},
            width: el.width,
            x: el.x,
            y: el.y,
            rotation: 0
        }))).then(createdImages=>{
           return miro.board.widgets.update(createdImages.map(image => (
               {
                   id: image.id,
                   metadata: {
                       [your_app_id]: Object.assign(image.metadata[your_app_id], {id: image.id})
                   }
               }
           )))
        })
        .then(res=> {
            console.log('created', res);
        });
    }

    if (toDelete.length > 0) {
        miro.board.widgets.update(toDelete.map((image,i) => ({
            id: image.id,
            x: -(image.metadata[your_app_id].width*2),
            y: image.metadata[your_app_id].height * 1.2 * i,
            metadata: {[your_app_id]: {}},
        })))
        .then(res=> {
            console.log("deleted", res);
        });
    }

    if (toUpdate.length > 0) {
        miro.board.widgets.update(toUpdate.map(image => {
            let newImage = uploadedImagesObject[image.metadata[your_app_id].filename];
            return {
                id: image.id,
                title: newImage.title,
                url: `https://miro-adobe-app.herokuapp.com/images/${board_id}/${newImage.filename}`,
                metadata: {
                    [your_app_id]: Object.assign(newImage,{id: image.id, origin: true})
                },
                width: newImage.width,
                x: newImage.x,
                y: newImage.y
            }
        }))
        .then(res=> {
            console.log("updated", res);
        });
    }

    if (toReload.length > 0) {
        miro.board.widgets.update(toReload.map(image => {
            return {
                id: image.id,
                url: image.url
            }
        }))
            .then(res=>{
            console.log("reloaded", res);
        });
    }


}

/**=========================================**/
/**=========================================**/
/**=========================================**/
/**=========================================**/