let icon =
`<g>
    <polygon points="45.22 45.02 3.17 45.02 3.17 2.98 36.68 2.98 45.22 11.52 45.22 45.02" fill="#ffd02f"/>
    <rect y="11.68" width="33.5" height="11.28" fill="#fe7903"/>
    <rect y="25.2" width="33.5" height="11.28" fill="#ff3c91"/>
    <polygon points="45.22 11.52 36.68 11.52 36.68 2.98 45.22 11.52" fill="#050038"/>
    <path d="M14.5,19.73l-.39,2H12.44l1.9-8.84H16.4l1.73,8.84H16.47l-.39-2Zm1.42-1.34-.29-1.85c-.09-.54-.21-1.42-.29-2h0c-.09.59-.22,1.51-.31,2l-.33,1.84Z" fill="#050038"/>
    <path d="M20.8,12.89l0,8.84H19.1V12.9Z" fill="#050038"/>
    <path d="M7.55,26.44l0,8.83H5.85l0-8.84Z" fill="#050038"/>
    <path d="M9.1,35.27V26.43h1.57L12,29.89c.26.68.7,1.82,1,2.58h0c-.06-.93-.18-2.46-.18-4.09V26.43h1.51l0,8.84H12.78l-1.36-3.35a26,26,0,0,1-.9-2.66h0c0,.89.11,2.26.12,4v2Z" fill="#050038"/>
    <path d="M15.85,26.55a8.2,8.2,0,0,1,1.75-.17,3.43,3.43,0,0,1,2.45.78,4.59,4.59,0,0,1,1.16,3.56A4.89,4.89,0,0,1,20,34.46a3.68,3.68,0,0,1-2.7.86,12.71,12.71,0,0,1-1.42-.09Zm1.73,7.34a1,1,0,0,0,.31,0c.82,0,1.54-.82,1.54-3.26,0-1.81-.48-2.91-1.52-2.91a1,1,0,0,0-.34,0Z" fill="#050038"/>
    <path d="M22.29,26.54A8.09,8.09,0,0,1,24,26.36a3.4,3.4,0,0,1,2.46.79,4.61,4.61,0,0,1,1.16,3.56,4.87,4.87,0,0,1-1.23,3.74,3.66,3.66,0,0,1-2.7.86,12.67,12.67,0,0,1-1.41-.09ZM24,33.88a1.46,1.46,0,0,0,.3,0c.83,0,1.55-.81,1.54-3.25,0-1.81-.47-2.91-1.51-2.91a1,1,0,0,0-.34,0Z" fill="#050038"/>
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