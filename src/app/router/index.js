import { createRouter, createWebHistory } from "vue-router";
const CartList = () => import('../components/cart/CartList.vue');
const ProductList = () => import('../components/product/ProductList.vue');
const ProductItem = () => import('../components/product/ProductItem.vue');
const LoginBox = () => import('../components/login/LoginBox.vue');
const NotFound = () => import('../components/NotFound.vue');

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/products',
            component: ProductList
        },
        {
            path: '/cart',
            component: CartList
        },
        {
            path: '/',
            redirect: '/products'
        },
        {
            path: '/products/:id',
            component: ProductItem,
            props: true,
            beforeEnter: (to, from, next) => {
                const id = to.params.id;
                if (![1, 2, 3, 4].includes(Number(id))) next('/not-found');
                else next();
            }
        },
        {
            path: '/login',
            component: LoginBox,
            beforeEnter: (to, from, next) => {
                const token = localStorage.getItem('token');
                if (token) next('/products');
                else next();
            }
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFound
        }
    ]
});

// the global route guard
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (!token && to.path !== '/login') next('/login');
    else next();
});

export default router;