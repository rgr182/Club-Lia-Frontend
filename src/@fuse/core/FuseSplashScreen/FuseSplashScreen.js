import React from 'react';

function FuseSplashScreen() {
	return (
		<div id="fuse-splash-screen">
			<div className="center">
				<div className="logo">
					<img width="200" src="assets/images/logos/clublia.png" alt="logo"/>
				</div>
				<div class="pure-material-progress-linear-wrapper pt-24">
                    <progress class="pure-material-progress-linear"/>
                </div>
			</div>
		</div>
	);
}

export default React.memo(FuseSplashScreen);
