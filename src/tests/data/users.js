export const usersToTests = {
    users: {
        testUser1: {
            firstName: 'Test',
            lastName: 'User',
            dob: '1995-05-04',
            street: 'Franka',
            postalCode: '37500',
            city: 'Lviv',
            state: 'Lviv',
            country: 'AL',
            phone: '380930055026',
            email: `testuser${Date.now()}_${Math.floor(Math.random() * 1000)}@example.com`,
            password: 'Strong#Password#123',
        },
        userStatic: {
            firstName: 'Test',
            lastName: 'User',
            dob: '1995-05-04',
            street: 'Franka',
            postalCode: '37500',
            city: 'Lviv',
            state: 'Lviv',
            country: 'AL',
            phone: '380930055026',
            email: 'testuser86@example.com',
            password: 'Strong#Password#123',
        },
    }
};