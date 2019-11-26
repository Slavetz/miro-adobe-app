let icon =
`<g>
    <rect width="48" height="48" fill="#fff"/>
    <polygon points="42.43 42.43 5.57 42.43 5.57 5.57 34.94 5.57 42.43 13.06 42.43 42.43" fill="#ffd02f"/>
    <rect x="2.78" y="13.2" width="29.38" height="9.89" fill="#fe7903"/>
    <rect x="2.78" y="25.06" width="29.38" height="9.89" fill="#ff3c91"/>
    <polygon points="42.43 13.06 34.94 13.06 34.94 5.57 42.43 13.06" fill="#050038"/>
    <path d="M15.5,20.25,15.15,22H13.69l1.67-7.76h1.8L18.68,22H17.22l-.33-1.77Zm1.25-1.17-.26-1.62c-.08-.48-.19-1.25-.26-1.76h0c-.08.51-.19,1.32-.27,1.77l-.29,1.61Z" fill="#050038"/>
    <path d="M21,14.26V22H19.53V14.26Z" fill="#050038"/>
    <path d="M9.41,26.14v7.75H7.92l0-7.75Z" fill="#050038"/>
    <path d="M10.77,33.88l0-7.75h1.38l1.2,3c.23.6.62,1.6.83,2.27h0c0-.82-.16-2.16-.16-3.59V26.13h1.32l0,7.74H14L12.8,30.94A20.75,20.75,0,0,1,12,28.6h0c0,.79.09,2,.1,3.53v1.75Z" fill="#050038"/>
    <path d="M16.68,26.24a7,7,0,0,1,1.53-.16,3,3,0,0,1,2.15.69,4,4,0,0,1,1,3.13,4.21,4.21,0,0,1-1.07,3.27,3.27,3.27,0,0,1-2.37.76c-.47,0-.94,0-1.24-.08Zm1.52,6.43a.8.8,0,0,0,.27,0c.72,0,1.35-.72,1.35-2.86,0-1.59-.42-2.55-1.33-2.55a.75.75,0,0,0-.3,0Z" fill="#050038"/>
    <path d="M22.33,26.23a6.4,6.4,0,0,1,1.53-.16,3,3,0,0,1,2.15.69,4,4,0,0,1,1,3.12A4.27,4.27,0,0,1,26,33.16a3.23,3.23,0,0,1-2.36.76c-.47,0-.95-.05-1.25-.08Zm1.52,6.43a1.1,1.1,0,0,0,.26,0c.73,0,1.36-.71,1.35-2.85,0-1.59-.42-2.55-1.32-2.55a.73.73,0,0,0-.3,0Z" fill="#050038"/>
 </g>`;

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
	miro.board.ui.openLeftSidebar('https://miro-adobe-app.herokuapp.com/app/sidebar_left.html');
}