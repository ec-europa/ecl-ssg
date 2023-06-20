import React from "react";
import CustomTheme from "./Utils/theme";

const SocialShare = ({ webtools, to }) => {
	const theme = CustomTheme();

  if (typeof window !== 'undefined' && webtools) {
    window.webtools = true;

	  const scriptContent = JSON.stringify({
	    service: "share",
	    popup: false,
	    to: to || ["e-mail", "facebook", "twitter", "google", "whatsapp", "more"],
	  });

	  return (
	    <div>
	      <script type="application/json" dangerouslySetInnerHTML={{ __html: scriptContent }} />
	    </div>
	  );
	} else {
		return (
			<ecl-social-media-share
			  variant="horizontal"
			  theme={theme}
			  description="Share this page"
			>
			  <ecl-social-media-share-item
			    theme={theme}
			    icon="facebook-color"
			    share-path="http://facebook.com"
			  >
			    Facebook
			  </ecl-social-media-share-item>
			  <ecl-social-media-share-item
			    theme={theme}
			    icon="twitter-color"
			    share-path="http://twitter.com"
			  >
			    Twitter
			  </ecl-social-media-share-item>
			  <ecl-social-media-share-item
			    theme={theme}
			    icon="instagram-color"
			    share-path="http://instagram.com"
			  >
			    Instagram
			  </ecl-social-media-share-item>
			  <ecl-social-media-share-item
			    theme={theme}
			    icon="linkedin-color"
			    share-path="http://linkedin.com"
			  >
			    Linkedin
			  </ecl-social-media-share-item>
			  <ecl-social-media-share-item
			    theme={theme}
			    icon="telegram-color"
			    share-path="http://telegram.com"
			  >
			    Telegram
			  </ecl-social-media-share-item>
			  <ecl-popover
			    ecl-script
			    theme={theme}
			    toggle-label="Other social networks"
			    list
			    icon="share"
			    icon-size="s"
			    item-id="popover-example"
			  >
			    <ecl-popover-item
						theme={theme}
			      path="/example"
			      icon="pinterest-color"
			      icon-sprite="icons-social-media"
			      icon-size="s"
			    >
			      Pinterest
			    </ecl-popover-item>
			    <ecl-popover-item
			      theme={theme}
			      path="/example"
			      icon="mastodon-color"
			      icon-sprite="icons-social-media"
			      icon-size="s"
			    >
			      Mastodon
			    </ecl-popover-item>
			    <ecl-popover-item
			      theme={theme}
			      path="/example"
			      icon="reddit-color"
			      icon-sprite="icons-social-media"
			      icon-size="s"
			    >
			      Reddit
			    </ecl-popover-item>
			    <ecl-popover-item
			      theme={theme}
			      path="/example"
			      icon="youtube-color"
			      icon-sprite="icons-social-media"
			      icon-size="s"
			    >
			      Youtube
			    </ecl-popover-item>
			    <ecl-popover-item
			      theme={theme}
			      path="/example"
			      icon="flickr-color"
			      icon-sprite="icons-social-media"
			      icon-size="s"
			    >
			      Flickr
			    </ecl-popover-item>
			    <ecl-popover-item
			      theme={theme}
			      path="/example"
			      icon="skype-color"
			      icon-sprite="icons-social-media"
			      icon-size="s"
			    >
			      Skype
			    </ecl-popover-item>
			  </ecl-popover>
			</ecl-social-media-share>
		);
	}
};

export default SocialShare;
