import React, {PropTypes} from 'react';

export default class SpotifyWidget extends React.Component {
    render() {
        return (
            <iframe
                src="https://embed.spotify.com/follow/1/?uri=spotify:user:1210925143&size=basic&theme=light"
                width="200"
                height="25"
                scrolling="no"
                frameborder="0"
                style={{border:"none", overflow:"hidden"}}
                allowtransparency="true">

            </iframe>
        )
    }
}