function copyTitleFromSource(widgets) {
    widgets.forEach(widget => {
        if (widget.type === 'IMAGE' && !widget.title && widget.metadata[your_app_id] && widget.metadata[your_app_id].id) {
            miro.board.widgets.get({id:widget.metadata[your_app_id].id})
                .then(data=>{
                    let update;
                    if (data[0] && widget.metadata[your_app_id].filename){
                        update = {
                            id: widget.id,
                            title: data[0].title + " (Copy)",
                            metadata: {[your_app_id]: {id:widget.metadata[your_app_id].id}}
                        };
                    } else if (data[0] && !widget.metadata[your_app_id].filename){
                        update = {
                            id: widget.id,
                            title: data[0].title + " (Copy)"
                        };
                    } else if (!data[0]){
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