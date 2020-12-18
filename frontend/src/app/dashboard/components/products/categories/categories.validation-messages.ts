const commanPattern = 'should be of [a-zA-Z0-9_] only.';
// const addressPattern = 'should contain [ a-z A-Z 0-9 _ @  # . / & * - : , [] " \' ] characters only.';

export default {

    CategoryName: [
        { type: 'required', message: 'Category name is required' },
        { type: 'minlength', message: 'Category name must be at least 2 characters long' },
        { type: 'maxlength', message: 'Category name cannot be more than 25 characters long' },
        { type: 'pattern', message: 'Category name cannot contain any whitespace' },
    ],
    CategoryTitle: [
        { type: 'required', message: 'Category title is required' },
        { type: 'minlength', message: 'Category title must be at least 5 characters long' },
        { type: 'maxlength', message: 'Category title cannot be more than 25 characters long' },
        { type: 'pattern', message: 'Category Title cannot contain any whitespace' },
    ],

    CategorySubTitle: [
        { type: 'required', message: 'Category sub title is required' },
        { type: 'minlength', message: 'Category sub title must be at least 5 characters long' },
        { type: 'maxlength', message: 'Category sub title cannot be more than 25 characters long' },
        { type: 'pattern', message: 'Category SubTitle cannot contain any whitespace' },
    ],

    CategoryDesc: [
        { type: 'required', message: 'Category description is required' },
        { type: 'minlength', message: 'Category description must be at least 5 characters long' },
        { type: 'maxlength', message: 'Category description cannot be more than 100 characters long' },
        { type: 'pattern', message: 'Category Desc cannot contain any whitespace' },
    ],

    CategoryDeepLink: [
        { type: 'required', message: 'Category deep link is required' },
        { type: 'minlength', message: 'Category deep link must be at least 5 characters long' },
        { type: 'maxlength', message: 'Category deep link cannot be more than 25 characters long' },
        { type: 'pattern', message: 'Category deep link should be proper' },
    ],
    Margin: [
        { type: 'required', message: 'Margin is required' },
        { type: 'min', message: 'Margin must be at least 0' },
        { type: 'max', message: 'Margin cannot be more than 100' },
    ],
    CategoryImageNode: [
        {
            type: 'chooseSmallSizeFile', message: 'Category ImageNode size is too large'
        }
    ]

};
