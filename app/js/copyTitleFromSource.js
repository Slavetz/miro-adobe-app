function copyTitleFromSource(widgets) {
    console.log('copyTitleFromSource', widgets);
    widgets.forEach(widget => {
        if (widget.type === 'IMAGE' && !widget.title && widget.metadata[your_app_id] && widget.metadata[your_app_id].id) {
            /** Если есть ссылка на первоисточник */
            /** Получаем информацию о первоисточнике */
            miro.board.widgets.get({id:widget.metadata[your_app_id].id})
                .then(data=>{
                    console.log(data);
                    let update;
                    if (data[0] && widget.metadata[your_app_id].origin === true) {
                        /** Если нашли первоисточник переименовываем его */
                        console.log('copyTitleFromSource', 1);
                        update = {
                            id: widget.id,
                            title: data[0].title + " (Copy)",
                            metadata: {[your_app_id]: {id: widget.metadata[your_app_id].id, origin: false}}
                        };
                    } else if (data[0] && widget.metadata[your_app_id].origin === false){
                        console.log('copyTitleFromSource', 2);
                        /** Если скопированный элемент origin - то делаем его не origin */
                        update = {
                            id: widget.id,
                            title: data[0].title + " (Copy)",
                        }
                    } else {
                        console.log('copyTitleFromSource', 3);
                        /** Если НЕ нашли первоисточник трем title и metadata  */
                        update = {
                            id: widget.id,
                            title: "",
                            metadata: {[your_app_id]: {}}
                        };
                    }
                    console.log('copyTitleFromSource', update);
                    return update;
                })
                .then(miro.board.widgets.update)
                .then(console.log)
                .catch(console.log);
        }
    })
}