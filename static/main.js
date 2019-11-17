const icon = '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>';

const uploadIcon = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
	'\t viewBox="0 0 49 50" style="enable-background:new 0 0 49 50;" xml:space="preserve">\n' +
	'<path style="fill:#4ACFD9;" d="M39.2,12.6c-0.6,0-1.3,0.1-1.9,0.2c0-0.3,0-0.7,0-1c0-6.2-5-11.2-11.2-11.2c-6.1,0-11.1,4.9-11.2,11\n' +
	'\tc-1.1-0.4-2.3-0.6-3.5-0.6C5.7,11,1,15.8,1,21.6c0,2.6,1,5.2,2.7,7.1c1.7,1.9,4,3.1,6.5,3.4c0.1,0.1,0.2,0.1,0.3,0.1H39c0,0,0,0,0,0\n' +
	'\tc0.1,0,0.1,0,0.2,0c5.4,0,9.8-4.4,9.8-9.8S44.6,12.6,39.2,12.6z"/>\n' +
	'<path style="fill:#0295AA;" d="M15,11.6c-1.1-0.4-2.3-0.6-3.5-0.6C5.7,11,1,15.8,1,21.6c0,2.6,1,5.2,2.7,7.1c1.7,1.9,4,3.1,6.5,3.4\n' +
	'\tc0.1,0.1,0.2,0.1,0.3,0.1H25V0.7C19.5,1.2,15.1,5.9,15,11.6z"/>\n' +
	'<g>\n' +
	'\t<path style="fill:#FFFFFF;" d="M33.6,12.5c-0.4,0-0.8-0.3-0.8-0.8c0-3.7-3-6.7-6.7-6.7c-0.4,0-0.8-0.3-0.8-0.8\n' +
	'\t\tc0-0.4,0.3-0.8,0.8-0.8c4.5,0,8.2,3.7,8.2,8.2C34.4,12.2,34,12.5,33.6,12.5z"/>\n' +
	'\t<path style="fill:#FFFFFF;" d="M45.2,23.1c-0.4,0-0.8-0.3-0.8-0.8c0-2.9-2.4-5.3-5.3-5.3c-0.4,0-0.8-0.3-0.8-0.8\n' +
	'\t\tc0-0.4,0.3-0.8,0.8-0.8c3.7,0,6.8,3,6.8,6.8C46,22.8,45.7,23.1,45.2,23.1z"/>\n' +
	'</g>\n' +
	'<path style="fill:#FF8C29;" d="M39.9,24L25.4,12.4c-0.3-0.2-0.7-0.2-0.9,0L10,24c-0.2,0.2-0.3,0.5-0.2,0.8c0.1,0.3,0.4,0.5,0.7,0.5\n' +
	'\th6.9V41c0,0.4,0.3,0.8,0.8,0.8h13.6c0.4,0,0.8-0.3,0.8-0.8V25.4h6.9c0.3,0,0.6-0.2,0.7-0.5C40.2,24.6,40.1,24.2,39.9,24z"/>\n' +
	'<path style="fill:#FD6A33;" d="M24.5,12.4L10,24c-0.2,0.2-0.3,0.5-0.2,0.8c0.1,0.3,0.4,0.5,0.7,0.5h6.9V41c0,0.4,0.3,0.8,0.8,0.8H25\n' +
	'\tV12.2C24.8,12.2,24.6,12.3,24.5,12.4z"/>\n' +
	'<g>\n' +
	'\t<path style="fill:#F0353D;" d="M31.8,44.6H18.1c-0.4,0-0.8-0.3-0.8-0.8c0-0.4,0.3-0.8,0.8-0.8h13.6c0.4,0,0.8,0.3,0.8,0.8\n' +
	'\t\tC32.5,44.3,32.2,44.6,31.8,44.6z"/>\n' +
	'\t<path style="fill:#F0353D;" d="M31.8,47.4H18.1c-0.4,0-0.8-0.3-0.8-0.8c0-0.4,0.3-0.8,0.8-0.8h13.6c0.4,0,0.8,0.3,0.8,0.8\n' +
	'\t\tC32.5,47.1,32.2,47.4,31.8,47.4z"/>\n' +
	'</g>\n' +
	'</svg>';

const refreshIcon = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
	'\t viewBox="0 0 48 48" style="enable-background:new 0 0 48 48;" xml:space="preserve">\n' +
	'<g>\n' +
	'\t<g>\n' +
	'\t\t<path d="M41.1,0c-0.9,0-1.7,0.8-1.7,1.7V8C30.6-0.6,16.5-0.3,8,8.5c-4,4.2-6.3,9.7-6.3,15.5c0,0.9,0.8,1.7,1.7,1.7\n' +
	'\t\t\ts1.7-0.8,1.7-1.7C5.1,13.6,13.6,5.1,24,5.1c5.3,0,10.3,2.2,13.9,6.1l-7.6,2.5c-0.9,0.3-1.4,1.3-1.1,2.2c0.3,0.9,1.3,1.4,2.2,1.1\n' +
	'\t\t\tl10.3-3.4c0.7-0.2,1.2-0.9,1.2-1.6V1.7C42.9,0.8,42.1,0,41.1,0z"/>\n' +
	'\t</g>\n' +
	'</g>\n' +
	'<g>\n' +
	'\t<g>\n' +
	'\t\t<path d="M44.6,22.3c-0.9,0-1.7,0.8-1.7,1.7c0,10.4-8.4,18.9-18.9,18.9c-5.3,0-10.3-2.2-13.9-6.1l7.6-2.5c0.9-0.3,1.4-1.3,1.1-2.2\n' +
	'\t\t\tc-0.3-0.9-1.3-1.4-2.2-1.1L6.3,34.4c-0.7,0.2-1.2,0.9-1.2,1.6v10.3c0,0.9,0.8,1.7,1.7,1.7s1.7-0.8,1.7-1.7V40\n' +
	'\t\t\tc8.8,8.5,22.9,8.3,31.5-0.5c4-4.2,6.3-9.7,6.3-15.5C46.3,23.1,45.5,22.3,44.6,22.3z"/>\n' +
	'\t</g>\n' +
	'</g>\n' +
	'</svg>\n';




miro.onReady(() => {
	miro.initialize({
        extensionPoints: {
            toolbar: {
                title: 'Upload Images',
                toolbarSvgIcon: uploadIcon,
                librarySvgIcon: uploadIcon,
                onClick: toolbar
            }
        }
    });

	miro.addListener('WIDGETS_CREATED', e => {
		e.data.forEach(widget=>{
			if (widget.type === 'IMAGE' && !widget.title && widget.metadata[your_app_id] && widget.metadata[your_app_id].title){
				let update = {
					id: widget.id,
					metadata: {[your_app_id]: {}}
				};
				miro.board.widgets.update(update);
			}
		})
	});

});

async function toolbar() {
    miro.board.openLeftSidebar('https://miro-adobe-app.herokuapp.com/static/sidebar_left.html');
}