const commanPattern = 'should be of [a-zA-Z0-9_] only.';
// const addressPattern = 'should contain [ a-z A-Z 0-9 _ @  # . / & * - : , [] " \' ] characters only.';

export const ValidationMessages = {
    user: {
        FirstName: [
            { type: 'required', message: 'First name is required' },
            { type: 'minlength', message: 'First name must be at least 2 characters long' },
            { type: 'maxlength', message: 'First name cannot be more than 25 characters long' },
            { type: 'pattern', message: 'First name must contain only letters' },
        ],
        LastName: [
            { type: 'required', message: 'Last name is required' },
            { type: 'minlength', message: 'Last name must be at least 2 characters long' },
            { type: 'maxlength', message: 'Last name cannot be more than 25 characters long' },
            { type: 'pattern', message: 'Last name must contain only letters' },
        ],
        Gender: [
            { type: 'required', message: 'Select Gender' }
        ],
        Address: [
            { type: 'required', message: 'Address is required' },
            { type: 'minlength', message: 'Address must be at least 5 characters long' },
            { type: 'maxlength', message: 'Address cannot be more than 25 characters long' },
            { type: 'pattern', message: 'Address must contain only letters' },

        ],
        MobileNo: [
            { type: 'required', message: 'Mobile number is required' },

            { type: 'minlength', message: 'Mobile number must be 10 digit number' },
            { type: 'maxlength', message: 'Mobile number must be 10 digit number' },

            { type: 'alreadyexist', message: 'Mobile number already exist ' },
            { type: 'unableToCheckWithServer', message: 'Unable to check with server' },
            { type: 'pattern', message: 'Mobile number must contain only number' },
        ],
        MobileNoAlt: [
            { type: 'minlength', message: 'Alternate mobile number. must be 10 digit number' },
            { type: 'maxlength', message: 'Alternate mobile number. must be 10 digit number' },
            { type: 'pattern', message: 'Mobile number must contain only number' },
            { type: 'alreadyexist', message: 'Mobile number already exist ' },
            { type: 'unableToCheckWithServer', message: 'Unable to check with server' },
            { type: 'sameMobileNo', message: 'Alter mobile no. must be different than mobile no.' },
        ],
        EmailId: [
            { type: 'required', message: 'Email id is required' },
            { type: 'pattern', message: 'Email id is must be valid' },
        ],
        Password: [
            { type: 'required', message: 'Password is required' },
            { type: 'minlength', message: 'Password should be minimum 8 characters' },
            { type: 'maxlength', message: 'Mobile no. must be 24 digit number' },
            { type: 'pattern', message: 'Password must match with pattern(??????)' },
            { type: 'passwordValid', message: 'Password is required' },
            { type: 'upper', message: 'Password should contain at least one upper case char.' },
            { type: 'lower', message: 'Password should contain at least one small case char.' },
            { type: 'number', message: 'Password should contain at least one digit.' },
            { type: 'special', message: 'Password should contain at least one Special character.' },
            // { type: 'pattern', message: 'Password must contain at least 1 Lowercase letter' },
        ],
        ConfirmPassword: [
            { type: 'required', message: 'Password is required' },
            { type: 'minlength', message: 'Password should be minimum 8 characters' },
            { type: 'maxlength', message: 'Password must be 10 digit number' },
            { type: 'mustmatch', message: 'Password must match ' },
        ],
        AddressLine1: [
            { type: 'required', message: 'Address is required' },
            { type: 'minlength', message: 'Address must be at least 5 characters long' },
            { type: 'maxlength', message: 'Address cannot be more than 25 characters long' },
            { type: 'pattern', message: 'Address must contain only letters' },
        ],
        AddressLine2: [
            { type: 'required', message: 'Address is required' },
            { type: 'minlength', message: 'Address must be at least 5 characters long' },
            { type: 'maxlength', message: 'Address cannot be more than 25 characters long' },
            { type: 'pattern', message: 'Address must contain only letters' },
        ],
        Place: [
            { type: 'required', message: 'Place is required' },
            { type: 'minlength', message: 'Place must be at least 2 characters long' },
            { type: 'maxlength', message: 'Place cannot be more than 25 characters long' },
            { type: 'pattern', message: 'Place must contain only letters' },
        ],
        Tahsil: [
            { type: 'required', message: 'Tahsil is required' },
            { type: 'minlength', message: 'Tahsil must be at least 2 characters long' },
            { type: 'maxlength', message: 'Tahsil cannot be more than 25 characters long' },
            { type: 'pattern', message: 'Tahsil must contain only letters' },

        ],
        Dist: [
            { type: 'required', message: 'Dist is required' },
            { type: 'minlength', message: 'Dist must be at least 2 characters long' },
            { type: 'maxlength', message: 'Dist cannot be more than 25 characters long' },
            { type: 'pattern', message: 'Dist must contain only letters' },
        ],
        State: [
            { type: 'required', message: 'State is required' },
            { type: 'minlength', message: 'State must be at least 2 characters long' },
            { type: 'maxlength', message: 'State cannot be more than 25 characters long' },
            { type: 'pattern', message: 'State must contain only letters' },
        ],
        Country: [
            { type: 'required', message: 'Country is required' },
            { type: 'minlength', message: 'Country must be at least 2 characters long' },
            { type: 'maxlength', message: 'Country cannot be more than 25 characters long' },
            { type: 'pattern', message: 'Country must contain only letters' },
        ],
        Pincode: [
            { type: 'required', message: 'Pincode is required' },
            { type: 'minlength', message: 'Pincode must be 6 digit number' },
            { type: 'maxlength', message: 'Pincode must be 6 digit number' },
            { type: 'pattern', message: 'Pincode must contain only number' },
        ],
        Landmark: [
            { type: 'required', message: 'Landmark is required' },
            { type: 'minlength', message: 'Landmark must be at least 2 characters long' },
            { type: 'maxlength', message: 'Landmark cannot be more than 25 characters long' },
            { type: 'pattern', message: 'Landmark must contain only letters' },
        ],

        IsActive: [
            { type: 'required', message: 'IsActive is required' },
            // { type: 'pattern', message: 'Password must contain at least 1 Lowercase letter' },
        ],
        Permission: [
            { type: 'required', message: 'Permission is required' },
            // { type: 'pattern', message: 'Password must contain at least 1 Lowercase letter' },
        ],

    },
    Brand: {
        Brandname: [
            { type: 'required', message: 'Brand name   is required' },
            { type: 'pattern', message: 'Brand name must not contain white spaces' },
        ],
        brandtitle: [
            { type: 'required', message: 'Brand title  is required' },
            { type: 'pattern', message: 'Brand title must not contain white spaces' },
        ],
        brandsubtitle: [
            { type: 'required', message: 'Brands ubtitle is required' },
            { type: 'pattern', message: 'Brandsub title must not contain white spaces' },
        ],
        branddesc: [
            { type: 'required', message: 'Brand desc is required' },
            { type: 'pattern', message: 'Brand desc must not contain white spaces' },
        ],
        ManufacturingRegion: [
            { type: 'required', message: 'Manufacturing Region is required' },
            { type: 'pattern', message: 'Manufacturing Region must not contain white spaces' },
        ],
        brandurl: [
            { type: 'required', message: 'brand url  is required' },
            { type: 'pattern', message: 'brand url should be proper' },
        ]

    },

    company: {
        companyname: [
            { type: 'required', message: 'Company name is required' },
            { type: 'minlength', message: 'Company name must be at least 2 characters long' },
            { type: 'maxlength', message: 'Company name cannot be more than 25 characters long' },
            { type: 'pattern', message: 'Company name must not contain white spaces' },
        ],
    },
    IsActive: [
        { type: 'required', message: 'IsActive is required' },
        // { type: 'pattern', message: 'Password must contain at least 1 Lowercase letter' },
    ],
    Permission: [
        { type: 'required', message: 'permission is required' },
    ],
};
