let icon =
`<svg id="adobe-miro-app" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
  <defs>
    <style>
      .cls-1 { fill: #ffd02f; }
      .cls-2 { fill: #fe7903; }
      .cls-3 { fill: #ff3c91; }
      .cls-4 { fill: #050038; }
    </style>
  </defs>
  <title>adobe-miro-app</title>
  <polygon class="cls-1" points="884 884 116 884 116 116 728 116 884 272 884 884"/>
  <rect class="cls-2" x="57.65" y="274.42" width="612.35" height="206.19"/>
  <rect class="cls-3" x="57.65" y="519.38" width="612.35" height="206.19"/>
  <g>
    <polygon class="cls-4" points="884 272 728 272 728 116 884 272"/>
    <path class="cls-4" d="M322.83,421.43l-7.11,36.91-30.42.06,34.64-161.52,37.61-.07,31.7,161.38-30.42.06-7-36.88ZM348.89,397l-5.34-33.76c-1.7-9.82-3.88-25.87-5.34-36.64h-.72c-1.66,10.78-4,27.55-5.68,36.9L325.89,397Z"/>
    <path class="cls-4" d="M438,296.64l.33,161.45-31.38.06-.33-161.44Z"/>
    <path class="cls-4" d="M196,542l.32,161.45-31.37.06-.33-161.44Z"/>
    <path class="cls-4" d="M224.31,703.39,224,542l28.74-.06,25,63.18c4.82,12.45,12.76,33.27,17.34,47.16h.48c-1-17-3.2-45-3.26-74.73l-.08-35.69,27.55-.06.33,161.45-28.75,0L266.58,642c-5.3-13.64-12.77-34-16.39-48.59h-.48c.75,16.29,2,41.2,2.07,73.54l.07,36.4Z"/>
    <path class="cls-4" d="M347.58,544.09c7.9-1.93,19.4-3.15,31.85-3.18,20.36,0,34.5,4.72,44.82,14.28,13.92,12.43,21.15,33.74,21.21,65.11.07,32.58-8.27,55.83-22.37,68.32-10.76,10.56-26.8,15.62-49.32,15.66a230.5,230.5,0,0,1-25.87-1.62Zm31.65,134.08a20.56,20.56,0,0,0,5.51.46c15.09,0,28.24-14.9,28.15-59.46-.07-33-8.74-53.16-27.66-53.12a18,18,0,0,0-6.22.73Z"/>
    <path class="cls-4" d="M465.19,543.85c7.9-1.93,19.4-3.15,31.85-3.18,20.36,0,34.51,4.73,44.82,14.29,13.92,12.42,21.15,33.73,21.22,65.1.06,32.58-8.28,55.83-22.38,68.32-10.76,10.56-26.8,15.62-49.31,15.67a232.46,232.46,0,0,1-25.88-1.63Zm31.65,134.08a20.56,20.56,0,0,0,5.51.46c15.09,0,28.24-14.9,28.15-59.46-.07-33-8.73-53.16-27.66-53.12a18,18,0,0,0-6.22.73Z"/>
  </g>
</svg>`;

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