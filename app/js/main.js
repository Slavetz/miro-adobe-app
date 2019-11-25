const icon = fetch('https://miro-adobe-app.herokuapp.com/');

miro.onReady(() => {

	miro.initialize({
        extensionPoints: {
            toolbar: {
                title: 'Import from ID/AI',
                toolbarSvgIcon: icon,
                librarySvgIcon: icon,
                onClick: toolbar
            }
        }
    });

	miro.addListener('WIDGETS_CREATED', e => {
		copyTitleFromSource(e.data);
	}).then(()=>{
		console.log("addListener WIDGETS_CREATED");
	}).catch(console.log);

});

async function toolbar() {
	miro.board.ui.openLeftSidebar('https://miro-adobe-app.herokuapp.com/static/sidebar_left.html');
}