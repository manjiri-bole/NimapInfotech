const commanPattern = 'should be of [a-zA-Z0-9_] only.';
// const addressPattern = 'should contain [ a-z A-Z 0-9 _ @  # . / & * - : , [] " \' ] characters only.';

export default {

    ProductName: [
        { type: 'required', message: 'Product name is required' },
        { type: 'minlength', message: 'Product name must be at least 2 characters long' },
        { type: 'maxlength', message: 'Product name cannot be more than 255 characters long' },
    ],
    CategoryName: [
        { type: 'required', message: 'Category name is required' },
    ]
};
