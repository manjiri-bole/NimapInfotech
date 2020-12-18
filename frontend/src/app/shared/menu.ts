
const objUserDetail = (localStorage.getItem('UserDetails'));
export let MENU_ITEM = [];

    MENU_ITEM.push({
        path: 'index',
        title: 'Dashboard',
        icon: 'dashboard',
    });

    
     
        MENU_ITEM.push({
            path: 'products',
            title: 'Products',
            icon: 'product-hunt',
            children: [
                {
                    path: '/',
                    title: 'Products',
                    icon: 'product-hunt'
                },

                {
                    path: 'categories',
                    title: 'Categories',
                    icon: 'list'
                },
            ]
        });

       

    
       