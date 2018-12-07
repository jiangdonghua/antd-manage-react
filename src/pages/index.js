import loadable from 'react-loadable';
import LoadingPage from '../components/LoadingPage';

// const Home=loadable({
//     loader:()=>import('./home'),
//     loading:LoadingPage,
//     delay:1000
// });
const defaultLoadable={
    loading:LoadingPage,
    delay:1000
};
const Home=loadable(Object.assign(defaultLoadable, { loader:()=>import('./home')
}));

const Icons=loadable(Object.assign(defaultLoadable, { loader:()=>import('./ui/icons')
}));

const Banners=loadable(Object.assign(defaultLoadable, { loader:()=>import('./ui/banners')
}));
const Buttons=loadable(Object.assign(defaultLoadable, { loader:()=>import('./ui/buttons')
}));
const Draggable=loadable(Object.assign(defaultLoadable, { loader:()=>import('./ui/draggable')
}));
const Emoji=loadable(Object.assign(defaultLoadable, { loader:()=>import('./ui/emoji')
}));
const Gallery=loadable(Object.assign(defaultLoadable, { loader:()=>import('./ui/gallery')
}));
const Map=loadable(Object.assign(defaultLoadable, { loader:()=>import('./ui/map')
}));
const Modals=loadable(Object.assign(defaultLoadable, { loader:()=>import('./ui/modals')
}));
const Notifications=loadable(Object.assign(defaultLoadable, { loader:()=>import('./ui/notifications')
}));
const Spins=loadable(Object.assign(defaultLoadable, { loader:()=>import('./ui/spin')
}));
const Tabs=loadable(Object.assign(defaultLoadable, { loader:()=>import('./ui/tabs')
}));
const Wysiwyg=loadable(Object.assign(defaultLoadable, { loader:()=>import('./ui/wysiwyg')
}));

export default {
    Home,Icons,Banners,Buttons,Draggable,Emoji,Gallery,Map,Modals,Notifications,Spins,Tabs,Wysiwyg
}