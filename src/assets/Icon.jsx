import React from 'react'

// default icons
import { ReactComponent as IconLogo } from './images/svg/logo.svg'
import { ReactComponent as IconAccount } from './images/svg/account.svg'
import { ReactComponent as IconBurgerMenu } from './images/svg/burger_menu.svg'
import { ReactComponent as IconCartShopping } from './images/svg/cart-shopping.svg'
import { ReactComponent as IconClose } from './images/svg/close.svg'

// social nets
import { ReactComponent as IconFacebook } from './images/svg/social nets/facebook.svg'
import { ReactComponent as IconVK } from './images/svg/social nets/vk.svg'
import { ReactComponent as IconGithub } from './images/svg/social nets/github.svg'
import { ReactComponent as IconYouTube } from './images/svg/social nets/youtube.svg'

// icons
import { ReactComponent as IconLockClosed } from './images/svg/icons/lock-closed-outline.svg'
import { ReactComponent as IconLockOpened } from './images/svg/icons/lock-open-outline.svg'
import { ReactComponent as IconSearch } from './images/svg/icons/search.svg'
import { ReactComponent as IconVis } from './images/svg/icons/visibility.svg'
import { ReactComponent as IconVisOff } from './images/svg/icons/visibility_off.svg'

const Icon = ({ name, className }) => {
	switch (name) {
		case 'logo':
			return <IconLogo className={className} />
		case 'account':
			return <IconAccount className={className} />
		case 'burger-menu':
			return <IconBurgerMenu className={className} />
		case 'cart-shopping':
			return <IconCartShopping className={className} />
		case 'close':
			return <IconClose className={className} />
		case 'facebook':
			return <IconFacebook className={className} />
		case 'vk':
			return <IconVK className={className} />
		case 'github':
			return <IconGithub className={className} />
		case 'youtube':
			return <IconYouTube className={className} />
		case 'lock-closed':
			return <IconLockClosed className={className} />
		case 'lock-opened':
			return <IconLockOpened className={className} />
		case 'search':
			return <IconSearch className={className} />
		case 'visibility':
			return <IconVis className={className} />
		case 'visibility-off':
			return <IconVisOff className={className} />
		default:
			return `Изображения с именем ${name} нет!`
	}
}

export default Icon
