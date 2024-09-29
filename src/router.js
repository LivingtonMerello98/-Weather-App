import { createRouter, createWebHistory } from 'vue-router';

// 1.importare la pagina
import HomePage from './pages/HomePage.vue';
import AboutPage from './pages/AboutPage.vue';
import ContactPage from './pages/ContactPage.vue';


//2 definiamo la rotta con Name, Path e Component.
const routes = [

    {
        name: 'homePage',
        path: '/',
        component: HomePage
    },
    {
        name: 'aboutPage',
        path: '/about',
        component: AboutPage
    },
    {
        name: 'contactPage',
        path: '/contacts',
        component: ContactPage
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;