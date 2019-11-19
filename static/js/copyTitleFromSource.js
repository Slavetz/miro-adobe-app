function copyTitleFromSource(widgets) {
    widgets.forEach(widget => {
        if (widget.type === 'IMAGE' && !widget.title && widget.metadata[your_app_id] && widget.metadata[your_app_id].id) {
            /** Если есть ссылка на первоисточник */
            /** Получаем информацию о первоисточнике */
            miro.board.widgets.get({id:widget.metadata[your_app_id].id})
                .then(data=>{
                    let update;
                    if (data[0]){
                        /** Если нашли первоисточник переименовываем его */
                        update = {
                            id: widget.id,
                            title: data[0].title + " (Copy)"
                        };
                        /** Если скопированный элемент origin - то делаем его не origin */
                        if (widget.metadata[your_app_id].origin === true){
                            update.metadata = {[your_app_id]: {id:widget.metadata[your_app_id].id, origin: false}}
                        }

                    } else {
                        /** Если НЕ нашли первоисточник трем title и metadata  */
                        update = {
                            id: widget.id,
                            title: "",
                            metadata: {[your_app_id]: {}}
                        };
                    }
                    return update;
                })
                .then(miro.board.widgets.update)
                .then(console.log)
                .catch(console.log);
        }
    })
}